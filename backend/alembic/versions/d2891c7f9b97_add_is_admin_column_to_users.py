"""Add is_admin column to users

Revision ID: d2891c7f9b97
Revises: 181223e80c9c
Create Date: 2024-10-21 20:00:43.100843+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect


# revision identifiers, used by Alembic.
revision: str = 'd2891c7f9b97'
down_revision: Union[str, None] = '181223e80c9c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Get the current connection and the inspector
    conn = op.get_bind()
    inspector = inspect(conn)

    # Check if the 'is_admin' column already exists
    if 'is_admin' not in [column['name'] for column in inspector.get_columns('users')]:
        op.add_column('users', sa.Column('is_admin', sa.BOOLEAN(), nullable=False, server_default='FALSE'))


def downgrade() -> None:
    # Get the current connection and the inspector
    conn = op.get_bind()
    inspector = inspect(conn)

    # Check if the 'is_admin' column exists before dropping it
    if 'is_admin' in [column['name'] for column in inspector.get_columns('users')]:
        op.drop_column('users', 'is_admin')
