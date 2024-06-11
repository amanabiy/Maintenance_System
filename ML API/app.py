from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
import pandas as pd
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api = Api(app, version='1.0', title='Maintenance Requests API',
          description='API to predict maintenance requests and estimate service time')

ns = api.namespace('predictions', description='Prediction operations')

try:
    model_requests = joblib.load('random_forest_model.joblib')
    label_encoders_requests = joblib.load('label_encoders.joblib')
    print("Requests model and label encoders loaded successfully")
    model_service_time = joblib.load('rf_model_service_time.joblib')
    label_encoders_service_time = joblib.load(
        'label_encoders_service_time.joblib')
    scaler_service_time = joblib.load('scaler_service_time.joblib')
    print("Service time model and encoders loaded successfully")
except FileNotFoundError as e:
    print(f"Error: {e}")

df_aggregated = pd.read_csv('cleaned_maintenance_requests.csv')


def decode_labels(df, label_encoders):
    for column, le in label_encoders.items():
        df[column] = le.inverse_transform(df[column])
    return df


def predict_maintenance_requests(year, month):
    input_data = [[year, month, name]
                  for name in df_aggregated['Name'].unique()]
    input_df = pd.DataFrame(input_data, columns=[
                            'Start Year', 'Start Month', 'Name'])
    predictions = model_requests.predict(input_df)
    result_df = input_df.copy()
    result_df['Predicted Request Count'] = np.round(predictions).astype(int)
    result_df = decode_labels(
        result_df, {'Name': label_encoders_requests['Name']})
    output_df = result_df[['Name', 'Predicted Request Count']]
    return output_df[output_df['Predicted Request Count'] > 0]


def estimate_service_time(name, request_priority, request_type, location, start_date):
    start_date = pd.to_datetime(start_date)
    start_day_of_week = start_date.dayofweek
    start_month = start_date.month
    input_data = {
        'Name': label_encoders_service_time['Name'].transform([name])[0],
        'Request Priority': label_encoders_service_time['Request Priority'].transform([request_priority])[0],
        'Request Type': label_encoders_service_time['Request Type'].transform([request_type])[0],
        'Location': label_encoders_service_time['Location'].transform([location])[0],
        'Start Day of Week': start_day_of_week,
        'Start Month': start_month
    }
    input_df = pd.DataFrame([input_data])
    scaled_input = scaler_service_time.transform(input_df)
    estimated_service_time = model_service_time.predict(scaled_input)[0]
    return estimated_service_time


def convert_hours_to_weeks_days_hours(hours):
    weeks = int(hours // (7 * 24))
    days = int((hours % (7 * 24)) // 24)
    remaining_hours = int(hours % 24)
    time_str = []
    if weeks > 0:
        time_str.append(f"{weeks} week{'s' if weeks > 1 else ''}")
    if days > 0:
        time_str.append(f"{days} day{'s' if days > 1 else ''}")
    if remaining_hours > 0:
        time_str.append(f"{remaining_hours} hour{'s' if remaining_hours > 1 else ''}")
    return ', '.join(time_str)


prediction_model = api.model('Prediction', {
    'month': fields.Integer(required=True, description='The month for prediction'),
    'year': fields.Integer(required=True, description='The year for prediction')
})

service_time_model = api.model('ServiceTime', {
    'name': fields.String(required=True, description='Equipment name'),
    'request_priority': fields.String(required=True, description='Request priority'),
    'request_type': fields.String(required=True, description='Request type'),
    'location': fields.String(required=True, description='Location'),
    'start_date': fields.String(required=True, description='Start date')
})


@ns.route('/predict_maintenance_requests')
class PredictMaintenanceRequests(Resource):
    @api.expect(prediction_model)
    @api.response(200, 'Success')
    @api.response(400, 'Validation Error')
    def post(self):
        data = request.json
        month = data['month']
        year = data['year']
        try:
            predictions = predict_maintenance_requests(year, month)
            return jsonify(predictions.to_dict(orient='records'))
        except Exception as e:
            return jsonify({'error': str(e)}), 400


@ns.route('/estimate_service_time')
class EstimateServiceTime(Resource):
    @api.expect(service_time_model)
    @api.response(200, 'Success')
    @api.response(400, 'Validation Error')
    def post(self):
        data = request.json
        name = data['name']
        request_priority = data['request_priority']
        request_type = data['request_type']
        location = data['location']
        start_date = data['start_date']
        try:
            estimated_hours = estimate_service_time(
                name, request_priority, request_type, location, start_date)
            converted_time = convert_hours_to_weeks_days_hours(estimated_hours)
            return jsonify({'estimated_service_time': converted_time})
        except Exception as e:
            return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
