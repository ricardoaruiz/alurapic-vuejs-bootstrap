export default class FotoService {

    constructor(resource) {
        this.resource = resource('v1/fotos{/id}');
    }

    carregarTodas() {
        return this.resource.query()
            .then(response => response.json())
            .catch(error => {
                const msgError = 'Erro ao buscar as fotos';
                console.error(msgError, error);
                throw new Error(msgError);
            });
    }

    carregar(id) {
        return this.resource.get({id})
            .then(response => response.json())
            .catch(error => {
                const msgError = `Erro ao buscar a foto com id ${id}`;
                console.error(msgError, error);
                throw new Error(msgError);                
            });
    }

    salvar(foto) {
        return this.resource.save(foto)
            .catch(error => {
                const msgError = `Erro ao salcar uma foto`;
                console.error(msgError, error);
                throw new Error(msgError);
            });
    }

    alterar(foto) {
        return this.resource.update({id: foto._id}, foto)
            .catch(error => {
                const msgError = `Erro ao alteara a foto com id ${id}`;
                console.error(msgError, error);
                throw new Error(msgError);                                
            });
    }

    remover(foto) {
        return this.resource.delete({id : foto._id})
            .catch(error => {
                const msgError = `Erro ao remover a foto com id ${foto._id}`;
                console.error(msgError, error);
                throw new Error(msgError);                
            });
    }

}