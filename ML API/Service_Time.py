import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

df = pd.read_csv('maintenance_requests.csv')
df.fillna(method='ffill', inplace=True)
df['Start Date'] = pd.to_datetime(df['Start Date'])
df['End Date'] = pd.to_datetime(df['End Date'])
df['Service Time'] = (df['End Date'] - df['Start Date']
                      ).dt.total_seconds() / 3600
df = df[df['Service Time'] > 0]

categorical_columns = ['Name', 'Request Priority', 'Request Type', 'Location']
label_encoders = {}
for column in categorical_columns:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

df['Start Day of Week'] = df['Start Date'].dt.dayofweek
df['Start Month'] = df['Start Date'].dt.month

df.drop(columns=['End Date'], inplace=True)
df.drop_duplicates(inplace=True)

features = ['Name', 'Request Priority', 'Request Type',
            'Location', 'Start Day of Week', 'Start Month']
X = df[features]
y = df['Service Time']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

rf_model = RandomForestRegressor(random_state=42)
rf_model.fit(X_train, y_train)

joblib.dump(rf_model, 'rf_model_service_time.joblib')
joblib.dump(label_encoders, 'label_encoders_service_time.joblib')
joblib.dump(scaler, 'scaler_service_time.joblib')
print("Service time model and encoders saved to disk")


def estimate_service_time(name, request_priority, request_type, location, start_date):
    start_date = pd.to_datetime(start_date)
    start_day_of_week = start_date.dayofweek
    start_month = start_date.month
    input_data = {
        'Name': label_encoders['Name'].transform([name])[0],
        'Request Priority': label_encoders['Request Priority'].transform([request_priority])[0],
        'Request Type': label_encoders['Request Type'].transform([request_type])[0],
        'Location': label_encoders['Location'].transform([location])[0],
        'Start Day of Week': start_day_of_week,
        'Start Month': start_month
    }
    input_df = pd.DataFrame([input_data])
    scaled_input = scaler.transform(input_df)
    estimated_service_time = rf_model.predict(scaled_input)[0]
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
        time_str.append(f"{remaining_hours} hour{
                        's' if remaining_hours > 1 else ''}")
    return ', '.join(time_str)


# estimated_time = estimate_service_time(
#     'Florescent Light bulb', 'High', 'Repair', 'Block 1', '2025-06-10')
# converted_time = convert_hours_to_weeks_days_hours(estimated_time)
# print(f"Estimated Service Time: {converted_time}")

# Performace Metrics
y_pred = rf_model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = rf_model.score(X_test, y_test)

print(f'Mean Absolute Error (MAE): {mae}')
print(f'R-squared (R²) Score: {r2}')
