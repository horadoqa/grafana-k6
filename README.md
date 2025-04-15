# grafana-k6

O Grafana k6 é uma ferramenta de teste de carga extensível, de código aberto e fácil de usar para desenvolvedores. O k6 permite que você evite problemas de desempenho e melhore a confiabilidade proativamente.

## k6 + InfluxDB + Grafana

### ✅ 1. **Instalar as ferramentas**

Você precisa ter essas ferramentas instaladas localmente:

- [x] **k6** – ferramenta de teste de carga  
- [x] **Docker** – pra subir InfluxDB e Grafana facilmente  
- [x] (opcional) **Docker Compose** – pra facilitar o gerenciamento dos containers

Se ainda não tiver alguma delas, posso te ajudar com os comandos de instalação!

---

### ✅ 2. **Subir o InfluxDB + Grafana com Docker**

Vamos usar um `docker-compose.yml` simples:

```yaml
services:
  influxdb:
    image: influxdb:1.8
    ports:
      - "8086:8086"
    volumes:
      - influxdb-data:/var/lib/influxdb
    environment:
      - INFLUXDB_DB=k6
      - INFLUXDB_ADMIN_USER=admin
      - INFLUXDB_ADMIN_PASSWORD=admin

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin

volumes:
  influxdb-data:
  grafana-storage:
```

Salve isso como `docker-compose.yml` e rode:

```bash
docker-compose up -d
```

---

### ✅ 3. **Rodar o k6 apontando pro InfluxDB**

Um exemplo de teste básico em k6 (arquivo `script.js`):

```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('https://www.globo.com/healthcheck/'); // ou a URL que você quer testar
  sleep(1);
}
```

Rode o teste assim, apontando pro Influx:

```bash
K6_OUT=influxdb=http://admin:admin@localhost:8086/k6 k6 run script.js
```

---

### ✅ 4. **Configurar o Dashboard no Grafana**

- Acesse: [http://localhost:3000](http://localhost:3000)  
- Login: `admin` / `admin`
- Vá em **"Add data source"**
  - Escolha **InfluxDB**
  - URL: `http://influxdb:8086` (se estiver usando Docker Compose)
  - Database: `k6`
  - User/Password: `admin` / `admin`
- Após adicionar, você pode:
  - Importar um dashboard pronto [aqui](https://grafana.com/grafana/dashboards/2587-k6-load-testing-results/)
  - Ou criar um do zero

---

Se quiser, posso te ajudar a:
- Montar um teste mais completo com `stages`
- Gerar um dashboard customizado
- Simular picos de carga
- Fazer isso tudo num ambiente separado (tipo staging)

Quer seguir com isso agora? 😄
