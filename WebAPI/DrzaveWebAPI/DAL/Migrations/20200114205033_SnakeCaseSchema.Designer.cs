﻿// <auto-generated />
using System;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DAL.Migrations
{
    [DbContext(typeof(CountriesdbContext))]
    [Migration("20200114205033_SnakeCaseSchema")]
    partial class SnakeCaseSchema
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnName("ime")
                        .HasColumnType("text");

                    b.HasKey("Id")
                        .HasName("pk_drzave");

                    b.ToTable("drzave");
                });

            modelBuilder.Entity("BusinessLogic.Models.Grad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("DrzavaId")
                        .HasColumnName("drzava_id")
                        .HasColumnType("integer");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnName("ime")
                        .HasColumnType("text");

                    b.Property<int?>("Populacija")
                        .HasColumnName("populacija")
                        .HasColumnType("integer");

                    b.HasKey("Id")
                        .HasName("pk_gradovi");

                    b.HasIndex("DrzavaId")
                        .HasName("ix_gradovi_drzava_id");

                    b.ToTable("gradovi");
                });

            modelBuilder.Entity("BusinessLogic.Models.Grad", b =>
                {
                    b.HasOne("BusinessLogic.Models.Drzava", null)
                        .WithMany("Gradovi")
                        .HasForeignKey("DrzavaId")
                        .HasConstraintName("fk_gradovi_drzave_drzava_id");
                });
#pragma warning restore 612, 618
        }
    }
}
