feat: Login 

uma API para ""autenticar "" o Usuario para ele acessar o software 

entrada de dados {senha, email} --/> 

(validar tipo ( porque a senha forte e email ja foi criada)e campo obrigatório) check

validar o tipo de dados com o zod

validar se o usuairo existe no banco com base no email (UNIQUE no banco)
se existe usuario recebe um indetificador (JWT)--\> se nao bloquear 


// Primeiro login.loginUsuario

controller vai valigar com o zod com safeParse(request.body)
validar os dados, se der erro retornar erro
se der certo passar para o service o