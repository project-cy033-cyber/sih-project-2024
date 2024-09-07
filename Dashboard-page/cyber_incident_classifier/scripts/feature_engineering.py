from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import pickle

def load_processed_data(file_path):
    df = pd.read_csv(file_path)
    return df

def extract_features(df):
    vectorizer = TfidfVectorizer(max_features=500)
    X = vectorizer.fit_transform(df['cleaned_url'])
    with open('../models/vectorizer.pkl', 'wb') as f:
        pickle.dump(vectorizer, f)
    return X

if __name__ == "__main__":
    df = load_processed_data('../data/processed_data.csv')
    X = extract_features(df)
    with open('../data/features.pkl', 'wb') as f:
        pickle.dump(X, f)
    df['label'].to_csv('../data/labels.csv', index=False)
