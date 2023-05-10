export default (sequelize, DataTypes) => {
  const Site = sequelize.define(
    'site',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      siteName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.JSON,
        allowNull: false
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contacts: {
        type: DataTypes.JSON,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      instructions: {
        type: DataTypes.JSON,
        allowNull: true
      },

      isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'sites',
      indexes: [{ unique: true, fields: ['id'] }]
    }
  );

  Site.associate = (models) => {
    Site.hasMany(models.User, { foreignKey: 'SiteId', as: 'users' });
    Site.hasMany(models.Scan, { foreignKey: 'siteId', as: 'scans' });
    Site.hasMany(models.Checkpoint, { foreignKey: 'siteId', as: 'checkpoints' });
    Site.hasMany(models.IncidentReport, { foreignKey: 'siteId', as: 'incidentReports' });
    Site.hasMany(models.Scan, { foreignKey: 'siteId', as: 'scans' });
  };

  return Site;
};
