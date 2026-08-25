namespace Hotel.Models
{
	public class Reserva
	{
		public List<Pessoa>? Hospedes { get; set; }
		public Suite? Suite { get; set; }
		public int DiasReservados { get; set; }

		public Reserva() { }

		public Reserva(int diasReservados)
		{
			DiasReservados = diasReservados;
		}

		public void CadastrarHospedes(List<Pessoa> hospedes)
		{
			if (Suite != null && hospedes.Count <= Suite.Capacidade)
			{
				Hospedes = hospedes;
			}
			else
			{
				throw new Exception("capacidade acima do limite");
			}
		}

		public void CadastrarSuite(Suite suite)
		{
			Suite = suite;
		}

		public int ObterQuantidadeHospedes()
		{
			return Hospedes?.Count ?? 0;
		}

		public decimal CalcularValorDiaria()
		{
			if (Suite == null)
			{
				throw new Exception("Suite nao cadastrada.");
			}

			decimal valor = Suite.ValorDiaria * DiasReservados;

			if (DiasReservados >= 10)
			{
				valor = valor * 0.90M;
			}

			return valor;
		}
	}
}
