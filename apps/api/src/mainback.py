from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
import strawberry
from strawberry.fastapi import GraphQLRouter
from typing import List, Optional

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AMP Database API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL types and schema
@strawberry.type
class AMP:
    id: int
    sequence: str
    name: str
    source_db: str
    length: int
    net_charge: Optional[float]
    activity_type: Optional[str]

@strawberry.type
class Query:
    @strawberry.field
    def amps(self) -> List[AMP]:
        # Implement query logic
        return []

schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema)

app.include_router(graphql_app, prefix="/graphql")

# REST endpoints
@app.get("/")
async def root():
    return {"message": "AMP Database API"}
