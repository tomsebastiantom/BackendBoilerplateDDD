// export default (sequelize, DataTypes) => {
//   const Tenant = sequelize.define(
//     'tenant',
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//       },
//       TenantName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       address: {
//         type: DataTypes.STRING,
//         allowNull: false
//       }
//     },
//     {
//       timestamps: true,
//       underscored: false,
//       tableName: 'tenants',
//       indexes: [{ unique: true, fields: ['id'] }]
//     }
//   );

//   Tenant.associate = (models) => {
//     Tenant.hasMany(models.User, { foreignKey: 'tenantId', as: 'users' });
//   };

//   return Tenant;
// };
