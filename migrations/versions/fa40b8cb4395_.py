"""empty message

Revision ID: fa40b8cb4395
Revises: 6ae85060719c
Create Date: 2021-07-22 14:20:01.418194

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa40b8cb4395'
down_revision = '6ae85060719c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('activities', 'gps_file_url',
               existing_type=sa.VARCHAR(length=256),
               type_=sa.PickleType(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('activities', 'gps_file_url',
               existing_type=sa.PickleType(),
               type_=sa.VARCHAR(length=256),
               existing_nullable=True)
    # ### end Alembic commands ###