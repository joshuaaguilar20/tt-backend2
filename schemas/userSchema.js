const graphql = require('graphql');
// const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

// TEMP
const users = [
    {   
        username: 'homers',
        firstname: 'Homer',
        lastname: ''
    },
    {   
        username: 'albundy',
        firstname: 'Al',
        lastname: 'Bundy'
    },
    {   
        username: 'spongebob',
        firstname: 'SpongeBob',
        lastname: 'SquarePants'
    }
];

// TODO: Add field for geometry
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        // id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        dob: { type: GraphQLString }
    }
});

// TODO: Add to args "email"
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                // id: {
                //     type: GraphQLString
                // },
                username: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                return users.filter(user => user.username === args.username)[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});