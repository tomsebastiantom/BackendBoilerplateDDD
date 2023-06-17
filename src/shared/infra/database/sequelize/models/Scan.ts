// export default (sequelize, DataTypes) => {
//   const Scan = sequelize.define(
//     'scan',
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//       },
//       siteId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: 'sites',
//           key: 'id'
//         }
//       },
//       userId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: 'users',
//           key: 'id'
//         }
//       },
//       identifier: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       timestamp: {
//         type: DataTypes.DATE,
//         allowNull: false
//       },
//       checkpointId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: 'checkpoints',
//           key: 'id'
//         }
//       },
//       location: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       comment: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       assets: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: true
//       }
//     },
//     {
//       timestamps: true,
//       underscored: false,
//       tableName: 'scans',
//       indexes: [{ unique: true, fields: ['id'] }]
//     }
//   );

//   Scan.associate = (models) => {
//     Scan.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
//     Scan.belongsTo(models.Site, { foreignKey: 'siteId', as: 'site' });
//     Scan.belongsTo(models.Checkpoint, {
//       foreignKey: 'checkpointId',
//       as: 'checkpoint'
//     });
//   };

//   return Scan;
// };
