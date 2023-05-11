export default (sequelize, DataTypes) => {
    const GuardReport = sequelize.define(
      'guardreport',
      {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          siteId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
              model: 'sites',
              key: 'id',
            },
          },
          userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          startTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          endTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          sentTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          recipient: {
            type: DataTypes.STRING,
            allowNull: true,
          },
      },
      {
        timestamps: true,
        underscored: false,
        tableName: 'guardreports',
        indexes: [{ unique: true, fields: ['id'] }]
      }
    );
  
    GuardReport.associate = (models) => {
        GuardReport.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        GuardReport.belongsTo(models.Site, { foreignKey: 'siteId', as: 'site', allowNull: true });
        
    };
  
    return GuardReport;
  };
  