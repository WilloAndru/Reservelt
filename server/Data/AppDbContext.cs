using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Mesa> Mesas { get; set; }
    public DbSet<Reserva> Reservas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Reserva>()
            .HasOne<Usuario>()
            .WithMany()
            .HasForeignKey(r => r.UsuarioFirebaseUid)
            .HasPrincipalKey(u => u.FirebaseUid);

        modelBuilder.Entity<Reserva>()
            .HasOne<Mesa>()
            .WithMany()
            .HasForeignKey(r => r.MesaId);
    }
}
