from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from email_sender import generate_and_send_emails  # import from email_sender.py

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-customers/")
async def upload_customers(file: UploadFile = File(...)):
    temp_file = f"./tmp_{file.filename}"
    with open(temp_file, "wb") as f:
        f.write(await file.read())

    success, failed = generate_and_send_emails(temp_file)
    return {"success": success, "failed": failed}
