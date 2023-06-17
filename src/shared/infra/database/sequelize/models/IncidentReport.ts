// export default (sequelize, DataTypes) => {
//     const IncidentReport = sequelize.define(
//       'incidentreport',
//       {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//           },
//           siteId: {
//             type: DataTypes.UUID,
//             allowNull: false,
//             references: {
//               model: 'sites',
//               key: 'id',
//             },
//           },
//           userId: {
//             type: DataTypes.UUID,
//             allowNull: false,
//             references: {
//               model: 'users',
//               key: 'id',
//             },
//           },
//           timeOfIncident: {
//             type: DataTypes.DATE,
//             allowNull: false,
//           },
//           incidentType: {
//             type: DataTypes.STRING,
//             allowNull: false,
//           },
//           incidentDescription: {
//             type: DataTypes.STRING,
//             allowNull: false,
//           },
//           photos: {
//             type: DataTypes.ARRAY(DataTypes.STRING),
//             allowNull: true,
//           },
//           videos: {
//             type: DataTypes.ARRAY(DataTypes.STRING),
//             allowNull: true,
//           },
//       },
//       {
//         timestamps: true,
//         underscored: false,
//         tableName: 'incidentreports',
//         indexes: [{ unique: true, fields: ['id'] }]
//       }
//     );
  
//     IncidentReport.associate = (models) => {
//         IncidentReport.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
//         IncidentReport.belongsTo(models.Site, { foreignKey: 'siteId', as: 'site' });
//     };
  
//     return IncidentReport;
//   };
  