// import runner from '../runner';

// export default {
//   up: async (queryInterface, Sequelize) => {
//     const CREATE_USER = () => {
//       return queryInterface.createTable('users', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         email: {
//           type: Sequelize.STRING,
//           allowNull: false,
//           unique: true
//         },
//         name: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         phone: {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         tenantId: {
//           type: Sequelize.UUID,
//           allowNull: true,
//           defaultValue: Sequelize.UUIDV4
//         },
//         username: {
//           type: Sequelize.STRING,
//           allowNull: false,
//           unique: true
//         },
//         password: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         isEmailVerified: {
//           type: Sequelize.BOOLEAN,
//           allowNull: true,
//           defaultValue: false
//         },
//         isAdminUser: {
//           type: Sequelize.BOOLEAN,
//           allowNull: true,
//           defaultValue: false
//         },
//         isSuperAdmin: {
//           type: Sequelize.BOOLEAN,
//           allowNull: true,
//           defaultValue: false
//         },
//         isDeleted: {
//           type: Sequelize.BOOLEAN,
//           allowNull: true,
//           defaultValue: false
//         },
//         lastLogin: {
//           type: Sequelize.DATE,
//           allowNull: true
//         },
//         roles: {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         Address: {
//           type: Sequelize.JSON,
//           allowNull: true
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_CHECKPOINT = () => {
//       return queryInterface.createTable('checkpoints', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         checkpointName: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         description: {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         isActive: {
//           type: Sequelize.BOOLEAN,
//           allowNull: true,
//           defaultValue: true
//         },
//         location: {
//           type: Sequelize.JSON,
//           allowNull: false
//         },
//         siteId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'sites',
//             key: 'id'
//           }
//         },
//         identifier: {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_GUARDREPORT = () => {
//       return queryInterface.createTable('guardreports', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         siteId: {
//           type: Sequelize.UUID,
//           allowNull: true,
//           references: {
//             model: 'sites',
//             key: 'id'
//           }
//         },
//         userId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'users',
//             key: 'id'
//           }
//         },
//         startTimestamp: {
//           type: Sequelize.DATE,
//           allowNull: false
//         },
//         endTimestamp: {
//           type: Sequelize.DATE,
//           allowNull: false
//         },
//         sentTimestamp: {
//           type: Sequelize.DATE,
//           allowNull: true
//         },
//         recipient: {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_INCIDENTREPORT = () => {
//       return queryInterface.createTable('incidentreports', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         siteId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'sites',
//             key: 'id'
//           }
//         },
//         userId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'users',
//             key: 'id'
//           }
//         },
//         timeOfIncident: {
//           type: Sequelize.DATE,
//           allowNull: false
//         },
//         incidentType: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         incidentDescription: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         photos: {
//           type: Sequelize.ARRAY(Sequelize.STRING),
//           allowNull: true
//         },
//         videos: {
//           type: Sequelize.ARRAY(Sequelize.STRING),
//           allowNull: true
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_PATROL = () => {
//       return queryInterface.createTable('patrols', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         siteId: {
//           type: Sequelize.UUID,
//           allowNull: true,
//           references: {
//             model: 'sites',
//             key: 'id'
//           }
//         },
//         type: {
//           type: Sequelize.ENUM('PatrolType1', 'PatrolType2', 'PatrolType3'), // Replace with actual patrol types
//           allowNull: false
//         },
//         userId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'users',
//             key: 'id'
//           }
//         },
//         siteIds: {
//           type: Sequelize.ARRAY(Sequelize.UUID),
//           allowNull: true
//         },
//         instructions: {
//           type: Sequelize.ARRAY(Sequelize.STRING),
//           allowNull: true
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_SCAN = () => {
//       return queryInterface.createTable('scans', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         siteId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'sites',
//             key: 'id'
//           }
//         },
//         userId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'users',
//             key: 'id'
//           }
//         },
//         identifier: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         timestamp: {
//           type: Sequelize.DATE,
//           allowNull: false
//         },
//         checkpointId: {
//           type: Sequelize.UUID,
//           allowNull: false,
//           references: {
//             model: 'checkpoints',
//             key: 'id'
//           }
//         },
//         location: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         comment: {
//           type: Sequelize.STRING,
//           allowNull: true
//         },
//         assets: {
//           type: Sequelize.ARRAY(Sequelize.STRING),
//           allowNull: true
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_SITE = () => {
//       return queryInterface.createTable('sites', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         siteName: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         address: {
//           type: Sequelize.JSON,
//           allowNull: false
//         },
//         companyName: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         contacts: {
//           type: Sequelize.JSON,
//           allowNull: true
//         },
//         isActive: {
//           type: Sequelize.BOOLEAN,
//           allowNull: false
//         },
//         instructions: {
//           type: Sequelize.JSON,
//           allowNull: true
//         },
//         isArchived: {
//           type: Sequelize.BOOLEAN,
//           allowNull: true,
//           defaultValue: false
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     const CREATE_TENANT = () => {
//       return queryInterface.createTable('tenants', {
//         id: {
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4,
//           allowNull: false,
//           primaryKey: true
//         },
//         TenantName: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         address: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//         }
//       });
//     };
//     await runner.run([
//       () => CREATE_TENANT(),
//       () => CREATE_USER(),
//       () => CREATE_SITE(),
//       () => CREATE_CHECKPOINT(),
//       () => CREATE_GUARDREPORT(),
//       () => CREATE_INCIDENTREPORT(),
//       () => CREATE_SCAN(),
//       () => CREATE_PATROL()
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return runner.run([() => queryInterface.dropTable('users')]);
//   }
// };
