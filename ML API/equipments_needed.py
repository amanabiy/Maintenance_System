import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

file_path = 'maintenance_requests.csv'
df = pd.read_csv(file_path)
df = df.dropna()
df['Start Date'] = pd.to_datetime(df['Start Date'])
df['End Date'] = pd.to_datetime(df['End Date'])
df['Start Month'] = df['Start Date'].dt.month
df['Start Year'] = df['Start Date'].dt.year
df['End Month'] = df['End Date'].dt.month
df['End Year'] = df['End Date'].dt.year

label_encoders = {}
categorical_columns = ['Name', 'Category', 'Request Priority', 'Location']
for column in categorical_columns:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

df_replacement = df[df['Request Type'] == 'Replacement']
df_aggregated = df_replacement.groupby(
    ['Start Year', 'Start Month', 'Name']).size().reset_index(name='Request Count')
cleaned_file_path = 'cleaned_maintenance_requests.csv'
df_aggregated.to_csv(cleaned_file_path, index=False)

X = df_aggregated[['Start Year', 'Start Month', 'Name']]
y = df_aggregated['Request Count']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Absolute Error: {mae}")

model_file_path = 'random_forest_model.joblib'
joblib.dump(model, model_file_path)
joblib.dump(label_encoders, 'label_encoders.joblib')
print("Trained model and label encoders saved to disk")


def decode_labels(df, label_encoders):
    for column, le in label_encoders.items():
        df[column] = le.inverse_transform(df[column])
    return df


def predict_maintenance_requests(year, month):
    input_data = [[year, month, name]
                  for name in df_aggregated['Name'].unique()]
    input_df = pd.DataFrame(input_data, columns=[
                            'Start Year', 'Start Month', 'Name'])
    predictions = model.predict(input_df)
    result_df = input_df.copy()
    result_df['Predicted Request Count'] = np.round(predictions).astype(int)
    result_df = decode_labels(result_df, {'Name': label_encoders['Name']})
    output_df = result_df[['Name', 'Predicted Request Count']]
    return output_df[output_df['Predicted Request Count'] > 0]


# predictions = predict_maintenance_requests(2028, 7)
# print(predictions)

# Performace Metrics
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = model.score(X_test, y_test)

print(f'Mean Absolute Error (MAE): {mae}')
print(f'R-squared (R²) Score: {r2}')
