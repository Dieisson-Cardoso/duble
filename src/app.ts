import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

const port = 3333;

app.get("/car", async (request, response) => {
  const output = await prisma.car.findMany();
  response.json(output);
})

app.get("/car/:id", async (request, response) => {
  const { id } = request.params;
  const output = await prisma.car.findUnique({
    where: {
      id: id
    }
  });

  response.json(output);
})

app.delete("/car/:id", async (request, response) => {
  const { id } = request.params;
  const entity = await prisma.car.delete({
    where: {
      id
    }
  })
  response.json(entity)
})

app.patch("/car/:id", async (request, response) => {
  const { id } = request.params;
  const { placa, marca, modelo, customer_id } = request.body;

  const entity = await prisma.car.update({
    data: {
      placa,
      marca,
      modelo,
      customer_id
    },
    where: {
      id
    }
  })
  response.json(entity)
})

app.get("/customer/:id", async (request, response) => {
  const { id } = request.params;
  const output = await prisma.customer.findUnique({
    where: {
      id: Number(id)
    }
  });

  response.json(output);
})


app.post("/customer", async (request, response) => {
  const { cpf, name, email, cep, data_nascimento, telefone } = request.body;
  const entity = await prisma.customer.create({
    data: {
      cpf, 
      name,
      email,
      cep,
      data_nascimento,
      telefone
    },
  });

  response.json(entity);
});

app.delete("/customer/:id", async (req, res) => {
  const { id } = req.params;
  const entity = await prisma.customer.delete({
    where: {
      id: Number(id)
    }
  })
  res.json(entity)
})

app.patch("/customer/:id", async (request, response) => {
  const { id } = request.params;
  const { cpf, name, email, cep, data_nascimento, telefone } = request.body;

  const entity = await prisma.customer.update({
    data: {
      cpf,
      name,
      email,
      cep,
      data_nascimento,
      telefone
    },
    where: {
      id: Number(id)
    }
  })

  response.json(entity)
})

app.patch("/rent/:id/:customer_id", async (req, res) => {
  const { id, customer_id} = req.params

  const test = await prisma.car.findUnique({where: {id}})
  const rent = new Date(test?.rent_start ? test?.rent_start : "")

  if (rent >= Date.now()) {
    
  }

  const entity = await prisma.car.update({
    data: {
      customer_id: Number(customer_id),
    },
    where: {
      id,
    },
  })

  res.json(entity)
})

app.listen(port, () => {
  console.log(`Server Running = in port http://localhost:${port}`);
});