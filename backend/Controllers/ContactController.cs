using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactController : ControllerBase
    {
        private readonly ContactService _contactService;

        public ContactController(ContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<List<ContactModel>> FindAll()
        {
            return await _contactService.FindAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactModel>> FindById(string id)
        {
            var contact = await _contactService.FindByIdAsync(id);

            if (contact is null)
            {
                return NotFound();
            }

            return contact;
        }

        [HttpGet]
        [Route("filter")]
        public async Task<ActionResult<ContactModel>> FindByFilter(string? name = null, string? email = null, DateTime? registrationDate = null)
        {
            var contact = await _contactService.FindByFilterAsync(name, email, registrationDate);

            if (contact is null)
            {
                return NotFound();
            }

            return contact;
        }

        [HttpPost]
        public async Task<IActionResult> Save(ContactModel newContact)
        {
            await _contactService.SaveAsync(newContact);

            return CreatedAtAction(nameof(FindById), new { id = newContact.Id }, newContact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, ContactModel updatedContact)
        {
            var contact = await _contactService.FindByIdAsync(id);

            if (contact is null) {
                return NotFound();
            }

            updatedContact.Id = contact.Id;

            await _contactService.UpdateAsync(id, updatedContact);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var contact = await _contactService.FindByIdAsync(id);

            if (contact is null) {
                return NotFound();
            }

            await _contactService.DeleteAsync(id);

            return NoContent();
        }
    }
}