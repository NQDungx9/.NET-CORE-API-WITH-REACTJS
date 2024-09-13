using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrudAPI.Models
{
    public class DbCandidate
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string FullName { get; set; }
        [Column(TypeName = "nvarchar(16)")]

        public string Mobile { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; }

        public int Age { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string BloodGruop { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Address { get; set; }

    }
}
