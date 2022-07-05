'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantRefund = sequelize.define('MerchantRefund', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        uniqueId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "User",
                key: "uniqueId"
            }
        },
        checkoutId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "MerchantCheckout",
                key: "uniqueId"
            }
        },
        paymentsId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Payments",
                key: "uniqueId"
            }
        },
        amount: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        fromAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        toaddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING
        },
        txid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        refundCompletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        time: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        timereceived: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        confirmations: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
        reason: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: "MerchantRefund",
    });
    MerchantRefund.associate = function (models) {
        MerchantRefund.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        });
        MerchantRefund.belongsTo(models.MerchantCheckout, {
            as: 'MerchantCheckout',
            foreignKey: 'checkoutId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        })
        MerchantRefund.belongsTo(models.MerchantPayments, {
            as: 'MerchantPayments',
            foreignKey: 'paymentsId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        })
    };
    return MerchantRefund;
};