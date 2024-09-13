using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrudAPI.Models;

namespace CrudAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DbCandidateController : ControllerBase
    {
        private readonly DonationDbContext _context;

        public DbCandidateController(DonationDbContext context)
        {
            _context = context;
        }

        // GET: api/DbCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbCandidate>>> GetCandidates()
        {
          if (_context.Candidates == null)
          {
              return NotFound();
          }
            return await _context.Candidates.ToListAsync();
        }

        // GET: api/DbCandidate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DbCandidate>> GetDbCandidate(int id)
        {
          if (_context.Candidates == null)
          {
              return NotFound();
          }
            var dbCandidate = await _context.Candidates.FindAsync(id);

            if (dbCandidate == null)
            {
                return NotFound();
            }

            return dbCandidate;
        }

        // PUT: api/DbCandidate/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDbCandidate(int id, DbCandidate dbCandidate)
        {
            dbCandidate.Id = id;

            _context.Entry(dbCandidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DbCandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DbCandidate
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DbCandidate>> PostDbCandidate(DbCandidate dbCandidate)
        {
          if (_context.Candidates == null)
          {
              return Problem("Entity set 'DonationDbContext.Candidates'  is null.");
          }
            _context.Candidates.Add(dbCandidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDbCandidate", new { id = dbCandidate.Id }, dbCandidate);
        }

        // DELETE: api/DbCandidate/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDbCandidate(int id)
        {
            if (_context.Candidates == null)
            {
                return NotFound();
            }
            var dbCandidate = await _context.Candidates.FindAsync(id);
            if (dbCandidate == null)
            {
                return NotFound();
            }

            _context.Candidates.Remove(dbCandidate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DbCandidateExists(int id)
        {
            return (_context.Candidates?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
