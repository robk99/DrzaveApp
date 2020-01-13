using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BusinessLogic.Migrations
{
    [DbContext(typeof(DrzavedbContext))]
    partial class DrzavedbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("BusinessLogic.Models.Drzava", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Drzave");
                });

            modelBuilder.Entity("BusinessLogic.Models.Grad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("DrzavaId")
                        .HasColumnType("integer");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Populacija")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DrzavaId");

                    b.ToTable("Gradovi");
                });

            modelBuilder.Entity("BusinessLogic.Models.Grad", b =>
                {
                    b.HasOne("BusinessLogic.Models.Drzava", null)
                        .WithMany("Gradovi")
                        .HasForeignKey("DrzavaId");
                });
#pragma warning restore 612, 618
        }
    }
}
