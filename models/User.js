'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        uniqueId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        exchangeName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImage: {
            type: DataTypes.STRING,
        },
        verifyToken: {
            type: DataTypes.STRING,
        },
        userVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        documentStatus: {
            type: DataTypes.STRING,
            defaultValue: 'Pending',
        },
        accountStatus: {
            type: DataTypes.STRING,
            defaultValue: 'Deactive',
        },
        autoFlag: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isWhitelistIP: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        whitelistedIP: {
            type: DataTypes.STRING,
        },
        lastLoggedInIP: {
            allowNull: true,
            type: DataTypes.STRING
        },
        lastLoggedInBrowser: {
            allowNull: true,
            type: DataTypes.STRING
        },
        lastLoggedInBrowserFootPrint: {
            allowNull: true,
            type: DataTypes.STRING
        },
        oldPwdReset: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        isMobileLogin: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        autoapprove: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isMarketMaker: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'User',
    });

    return User;
};
