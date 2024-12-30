from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class AMP(BaseModel):
    id: int
    sequence: str
    name: str
    length: int
    activity_type: Optional[str] = None
    source_organism: Optional[str] = None

# Sample data for testing
SAMPLE_AMPS = [
    {
        "id": 1,
        "sequence": "LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES",
        "name": "LL-37",
        "length": 37,
        "activity_type": "antibacterial",
        "source_organism": "Homo sapiens"
    },
    {
        "id": 2,
        "sequence": "GIGKFLHSAGKFGKAFVGEIMKS",
        "name": "Magainin 2",
        "length": 23,
        "activity_type": "antibacterial",
        "source_organism": "Xenopus laevis"
    }
]

@app.get("/")
async def root():
    return {"message": "Welcome to AMP Database API. Go to /docs for API documentation"}

@app.get("/api/amps", response_model=List[AMP])
async def get_amps():
    return SAMPLE_AMPS

@app.get("/api/amps/{amp_id}", response_model=AMP)
async def get_amp(amp_id: int):
    for amp in SAMPLE_AMPS:
        if amp["id"] == amp_id:
            return amp
    return {"error": "AMP not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)