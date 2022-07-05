'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantBalance = sequelize.define('MerchantBalance', {
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
        merchantUserId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "User",
                key: "uniqueId"
            }
        },
        amount: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        withdraw: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
            defaultValue: 0,
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeOfRecord: {
            type: DataTypes.ENUM(['admin', 'merchant', 'globiance-agent', 'merchant-agent']),
            allowNull: true,
        },
        currencyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
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
        tableName: 'MerchantBalance',
    });
    MerchantBalance.associate = function (models) {
        MerchantBalance.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'merchantUserId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        })
    };
    return MerchantBalance;
};