module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {    //blog is table name on database
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    
    });
    return Blog;
  };
