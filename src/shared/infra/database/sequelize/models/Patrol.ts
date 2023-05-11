export default (sequelize, DataTypes) => {
  const Patrol = sequelize.define(
    'patrol',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      siteId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'sites',
          key: 'id'
        }
      },
      type: {
        type: DataTypes.ENUM('PatrolType1', 'PatrolType2', 'PatrolType3'), // Replace with actual patrol types
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      siteIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true
      },
      instructions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    },
    {
      timestamps: true,
      underscored: false,
      tableName: 'patrols',
      indexes: [{ unique: true, fields: ['id'] }]
    }
  );

  Patrol.associate = (models) => {
    Patrol.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Patrol.belongsTo(models.Site, {
      foreignKey: 'siteId',
      as: 'site',
      allowNull: true
    });
  };

  return Patrol;
};
