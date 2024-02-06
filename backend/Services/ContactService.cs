using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Services
{
    public class ContactService
    {
        private readonly IMongoCollection<ContactModel> _contactsCollection;

        public ContactService(IOptions<ContactsDatabaseSettings> contactsDatabaseSettings)
        {
            var mongoClient = new MongoClient(contactsDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(contactsDatabaseSettings.Value.DatabaseName);

            _contactsCollection = mongoDatabase.GetCollection<ContactModel>(contactsDatabaseSettings.Value.ContactsCollectionName);
        }
    }
}