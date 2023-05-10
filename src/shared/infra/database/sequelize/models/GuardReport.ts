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
          startDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          endDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          sentDate: {
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
        underscored: true,
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
  