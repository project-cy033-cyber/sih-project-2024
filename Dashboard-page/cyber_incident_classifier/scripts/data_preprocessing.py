import pandas as pd
import re

def load_data(file_path):
    df = pd.read_csv(file_path)
    return df

def clean_url(url):
    url = re.sub(r'https?://(www\.)?', '', url)
    url = re.sub(r'\W+', ' ', url)
    return url.strip()

def preprocess_data(df):
    df['cleaned_url'] = df['url'].apply(clean_url)
    return df[['cleaned_url', 'label']]

if __name__ == "__main__":
    df = load_data('../data/raw_data.csv')
    df = preprocess_data(df)
    df.to_csv('../data/processed_data.csv', index=False)
