export default (sequelize, DataTypes) => {
  const Checkpoint = sequelize.define(
    'checkpoint',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      checkpointName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      location: {
        type: DataTypes.JSON,
        allowNull: false
      },
      siteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'sites',
          key: 'id'
        }
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: true,
      underscored: false,
      tableName: 'checkpoints',
      indexes: [{ unique: true, fields: ['id'] }]
    }
  );

  Checkpoint.associate = (models) => {
        Checkpoint.belongsTo(models.Site, { foreignKey: 'siteId', as: 'site' });
        Checkpoint.hasMany(models.Scan, { foreignKey: 'checkpointId', as: 'scans' });
  };

  return Checkpoint;
};
