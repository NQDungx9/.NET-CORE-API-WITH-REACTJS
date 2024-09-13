using Microsoft.EntityFrameworkCore;

namespace CrudAPI.Models
{
    public class DonationDbContext : DbContext
    {
        public DonationDbContext(DbContextOptions<DonationDbContext> options):base(options)
        {
            
        }
        public DbSet<DbCandidate> Candidates { get; set; }
    }
}
