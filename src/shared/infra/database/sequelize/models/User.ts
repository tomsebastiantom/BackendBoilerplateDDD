export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isAdminUser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
      },
      roles: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Address: {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      timestamps: true,
      underscored: false,
      tableName: 'users',
      indexes: [{ unique: true, fields: ['email'] }]
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Scan, { foreignKey: 'userId', as: 'scans' });
    User.belongsTo(models.Tenant, {
      foreignKey: 'tenantId',
      targetKey: 'id',
      as: 'tenant'
    });
    User.hasMany(models.IncidentReport, {
      foreignKey: 'userId',
      as: 'incidentReports'
    });
    User.hasMany(models.Scan, { foreignKey: 'userId', as: 'scans' });
    User.hasMany(models.Patrol, { foreignKey: 'userId', as: 'patrols' });
  };

  return User;
};
