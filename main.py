from flask import Flask, request, jsonify
import pandas as pd
from collections import Counter
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # allow all origins


app = Flask(__name__)

REQUIRED_COLUMNS = ["Company Name", "RPC Name", "RPC Email Address", "Industry", "HAVC Needs"]

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file:
        return jsonify({"message": "No file uploaded"}), 400

    try:
        # Read file
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)

        # Check required columns
        missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
        if missing_cols:
            return jsonify({"message": f"Missing columns: {', '.join(missing_cols)}"}), 400

        # Basic summary
        summary = {
            "totalRows": len(df),
            "totalCompanies": df["Company Name"].nunique(),
            "totalRPCs": df["RPC Name"].nunique(),
        }

        # Industry distribution
        industry_counts = df["Industry"].value_counts().reset_index()
        industry_counts.columns = ["industry", "count"]
        industry_distribution = industry_counts.to_dict(orient="records")

        # HAVC Needs distribution
        havc_counts = df["HAVC Needs"].value_counts().reset_index()
        havc_counts.columns = ["HAVC_Needs", "count"]
        havc_needs = havc_counts.to_dict(orient="records")

        return jsonify({"summary": summary, "chartsData": {"industryDistribution": industry_distribution, "havcNeeds": havc_needs}})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
