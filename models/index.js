var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    route: {
        type: Sequelize.VIRTUAL,
        set(){
            this.setDataValue('/wiki/'+ this.urlTitle);
        }
    },
},{
    hooks: {
        beforeValidate: (page)=>{
            page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
        } 
    },
    getterMethods:{
        route: function(){
            return '/wiki/' + this.urlTitle;
        }
    }

});

  const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });

  module.exports = {
      Page: Page,
      User: User,
      db: db,
  }