	window.addEventListener('load', criar_tabela);
		var db = openDatabase("BD_CADASTRO", "1.0", "TiPS Database Example", 2 * 1024 * 1024);
	
	function criar_tabela(){
		db.transaction(function(tx) {
			//tx.executeSql("DROP TABLE myTable" );
			tx.executeSql("CREATE TABLE IF NOT EXISTS TB_PESSOA ( id INTEGER PRIMARY KEY,nome TEXT,idade INT NOT NULL,sexo NVARCHAR NOT NULL)" );
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
		
		db.transaction(function(tx) {
		if(id){
			tx.executeSql('UPDATE TB_PESSOA SET nome=?, idade=?,sexo=?, WHERE id=?', [nome,idade,sexo,id],null);
		}else{
			tx.executeSql('INSERT INTO TB_PESSOA ( nome,idade,sexo) VALUES (?,?,?)', [nome,idade,sexo]);
		}
    });
	mostrar_dados();
	limpaCampo();
	
	};
	
	function mostrar_dados(){
		var table = document.getElementById('tb_registro');
		
		db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM TB_PESSOA', [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar_dados(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].idade + '</td>';
					tr += '<td>' + rows[i].sexo + '</td>';
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
    
		id.value = _id;
		
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM TB_PESSOA WHERE id=?', [_id], function (tx, resultado) {
				var rows = resultado.rows[0];

				nome.value = rows.nome;
				idade.value = rows.idade;
				sexo.value = rows.sexo;
        });
    });
	inputSHOW(true);
};

	function deletar(){
		
		var nome = document.getElementById('nome').value;
		
		db.transaction(function(tx) {
			tx.executeSql("DELETE FROM TB_PESSOA WHERE nome=?", [nome]);
		});
		
		mostrar_dados();
		limpaCampo(); 
	
	}

	function limpaCampo(){
    
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('sexo').value = '';
}

	
	
	
	
	
	
	
	