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

        public async Task<List<ContactModel>> FindAllAsync()
        {
            return await _contactsCollection.Find(_ => true).ToListAsync();
        }

        public async Task<ContactModel?> FindByIdAsync(string id) 
        {
            return await _contactsCollection.Find(item => item.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ContactModel?> FindByFilterAsync(string? name, string? email, DateTime? registrationDate) 
        {
            return await _contactsCollection
                            .Find(item => 
                                item.Name == name || 
                                item.Email == email ||
                                item.RegistrationDate == registrationDate)
                            .FirstOrDefaultAsync();
        }

        public async Task SaveAsync(ContactModel contactModel)
        {
            await _contactsCollection.InsertOneAsync(contactModel);
        }

        public async Task UpdateAsync(string id, ContactModel updatedContactModel)
        {
            await _contactsCollection.ReplaceOneAsync(item => item.Id == id, updatedContactModel);
        }

        public async Task DeleteAsync(string id)
        {
            await _contactsCollection.DeleteOneAsync(item => item.Id == id);
        }
    }
}