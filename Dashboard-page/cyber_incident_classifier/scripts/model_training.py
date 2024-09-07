import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd

def load_data():
    with open('../data/features.pkl', 'rb') as f:
        X = pickle.load(f)
    y = pd.read_csv('../data/labels.csv')
    return X, y

def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train.values.ravel())
    with open('../models/trained_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    return model, X_test, y_test

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

if __name__ == "__main__":
    X, y = load_data()
    model, X_test, y_test = train_model(X, y)
    evaluate_model(model, X_test, y_test)
