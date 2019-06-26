	window.addEventListener('load', criar_tabela);
		var db = openDatabase("BD_CADASTRO", "1.0", "TiPS Database Example", 2 * 1024 * 1024);
	
	function criar_tabela(){
		db.transaction(function(tx) {
			//tx.executeSql("DROP TABLE myTable" );
			tx.executeSql("CREATE TABLE IF NOT EXISTS bd_formulario ( id INTEGER PRIMARY KEY,nome TEXT NOT NULL,idade INT NOT NULL,sexo NVARCHAR NOT NULL,estado TEXT NOT NULL,cidade TEXT NOT NULL)" );
			// tx.executeSql('INSERT INTO myTable ( nome,apto) VALUES ("a", "b")');
		})
	
		document.getElementById('btn-salvar').addEventListener('click', salvar_dados);
		
		mostrar_dados();
	};
	
	function salvar_dados(){
		//arrumar var id
		var id = document.getElementById('id').value;
		var nome = document.getElementById('nome').value;
		var idade = document.getElementById('idade').value;
		var sexo = document.getElementById('sexo').value;
		var estado = document.getElementById('estado').value;
		var cidade = document.getElementById('cidade').value;
		
		db.transaction(function(tx) {
		if(id){
			tx.executeSql('UPDATE bd_formulario SET nome=?, idade=?,sexo=?,estado=?,cidade=?, WHERE id=?', [nome,idade,sexo,estado,cidade,id],null);
		}else{
			tx.executeSql('INSERT INTO bd_formulario ( nome,idade,sexo,estado,cidade) VALUES (?,?,?,?,?)', [nome,idade,sexo,estado,cidade]);
		}
    });
	mostrar_dados();
	limpaCampo();
	
	};
	
	function mostrar_dados(){
		var table = document.getElementById('tb_registro');
		
		db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM bd_formulario', [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar_dados(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].idade + '</td>';
					tr += '<td>' + rows[i].sexo + '</td>';
					tr += '<td>' + rows[i].estado + '</td>';
					tr += '<td>' + rows[i].cidade + '</td>';
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });
//document.getElementById('textoid').value;
	};
	
	function atualizar_dados(_id){   
    
		var id = document.getElementById('id').value;
		var nome = document.getElementById('nome').value;
		var idade = document.getElementById('idade').value;
		var sexo = document.getElementById('sexo').value;
		var estado = document.getElementById('estado').value;
		var cidade = document.getElementById('cidade').value;
    
		id.value = _id;
		
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM bd_formulario WHERE id=?', [_id], function (tx, resultado) {
				var rows = resultado.rows[0];

				nome.value = rows.nome;
				idade.value = rows.idade;
				sexo.value = rows.sexo;
				estado.value = rows.estado;
				cidade.value = rows.cidade;
        });
    });
	inputSHOW(true);
};

	function deletar(){
		
		var nome = document.getElementById('nome').value;
		
		db.transaction(function(tx) {
			tx.executeSql("DELETE FROM bd_formulario WHERE nome=?", [nome]);
		});
		
		mostrar_dados();
		limpaCampo(); 
	
	}

	function limpaCampo(){
    
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
}

	
	
	
	
	
	
	
	