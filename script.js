
        async function chamarAPI(cidade){
            try{
                cidade = document.getElementById('cidade').value;
                document.querySelector('#gifEarthSpin').style.display = 'block';
                document.querySelector('#voltar').style.display = 'none';
                const resp = await fetch(`http://localhost:3000/cidade/previsao/${cidade}`, {
                    method: 'GET'
                });
                const obj = await resp.json();
               
                if(cidade.trim()=== "" || !obj.name){
                    console.log(obj.json)
                    window.alert('Cidade inválida :/')
                    document.querySelector('#gifEarthSpin').style.display = 'none';
                    limparCampos()
                }
                else{
                    showPrevisao(obj);
                    console.log(obj);
                    gifTempo(obj);
                    document.querySelector('#gifEarthSpin').style.display = 'none';
                    document.querySelector('#voltar').style.display = 'none';
                    }
            }
            catch(error){
                console.error('Servidor indisponível:' + error);
                window.alert('Erro ao processar a solicitação, Por favor, tente novamente mais tarde :/')
                document.querySelector('#gifEarthSpin').style.display = 'none';
                document.querySelector('#voltar').style.display = 'block';
            }
            }
            
        async function buscarCEP(obj){
            try{
                const input_cep = document.getElementById('input_cep').value;
                document.querySelector('#gifEarthSpin').style.display = 'block';
                document.querySelector('#voltar2').style.display = 'none';
                const respCEP = await fetch(`http://localhost:3000/cep/${input_cep}`, {
                    method: 'GET'
                });

                if (input_cep.trim()=== "" || !respCEP.ok) { 
                    window.alert('CEP inválido :/');
                    console.log('Erro ao validar o CEP: ' + respCEP.status + respCEP.statusText)
                    return;
                }
                else{
                    const resp = await fetch(`http://localhost:3000/cep/previsao/${input_cep}`,{
                        method:'GET'
                    });
                    const obj= await resp.json();
                    document.querySelector('#gifEarthSpin').style.display= "none";
                    showPrevisao(obj);
                    gifTempo(obj);
                    document.querySelector('#voltar2').style.display = 'none';
                }
            }
            catch(error){
                console.error('Servidor indisponível: ' + error)
                window.alert('Erro ao processar a solicitação, Por favor, tente novamente mais tarde :/')
                document.querySelector('#gifEarthSpin').style.display = 'none';
                document.querySelector('#voltar2').style.display = 'block';
            }
        }

            function showPrevisao(obj){     
                document.getElementById('city').innerHTML = `${obj.name}, ${obj.sys.country}`;
                document.getElementById('clima').innerHTML = `${obj.weather[0].description}, ${Math.round(obj.main.temp)}°C`;
                document.getElementById('ventania').innerHTML = `Vento: ${obj.wind.speed}`;
                
            }

                document.getElementById('button_cep').addEventListener('click',buscarCEP)
            function modalCidade(){
                document.querySelector('#btnCidade').style.display = 'none'
                document.querySelector('#btnCep').style.display = 'none'
                document.querySelector('#form1').style.display = 'block'
                document.querySelector('#cidade').value="";
            }

                document.getElementById('btnCidade').addEventListener('click', modalCidade)
                document.getElementById('btnCep').addEventListener('click',modalCep)
            function modalCep(){
                document.querySelector('#btnCidade').style.display = 'none'
                document.querySelector('#btnCep').style.display = 'none'
                document.querySelector('#form2').style.display = 'block'
                document.querySelector('#input_cep').value="";
                }
                
        document.getElementById('limparC').addEventListener('click',limparCampos);
        document.getElementById('limparC2').addEventListener('click',limparCampos);
        function limparCampos(){
            document.getElementById('cidade').value = "";
            document.getElementById('input_cep').value = "";
            document.querySelector('p#city').innerHTML="";
            document.querySelector('p#pais').innerHTML="";
            document.querySelector('p#clima').innerHTML="";
            document.querySelector('p#ventania').innerHTML="";
            document.querySelector('#voltar').style.display = 'block'
            document.querySelector('#voltar2').style.display = 'block'
    }

        function voltar(){
            document.querySelector('#form1').style.display = 'none';
            document.querySelector('#form2').style.display = 'none';
            document.querySelector('.btnCidade').style.display = 'inline-block'
            document.querySelector('.btnCep').style.display = 'inline-block'
        }

        function gifTempo(obj){
            let body = document.body;

            if(Math.round(obj.main.temp) > 26){
                document.getElementById('gifSol').style.display = 'block';
                }
            else if(Math.round(obj.main.temp) >= 20 && Math.round(obj.main.temp) <=25){
                document.getElementById('gifCloudy').style.display = 'block';
            }
            else if(Math.round(obj.main.temp) >= 12 && Math.round(obj.main.temp) <=19){
                document.getElementById('gifRain').style.display = 'block';
            }
            else if(Math.round(obj.main.temp) <= 11){
                document.getElementById('gifFrost').style.display = 'block';
            }
            document.getElementById('limparC').addEventListener('click',function(){
                document.getElementById('gifSol').style.display = 'none';
                document.getElementById('gifCloudy').style.display = 'none';
                document.getElementById('gifRain').style.display = 'none';
                document.getElementById('gifFrost').style.display = 'none';
            })

            document.getElementById('limparC2').addEventListener('click',function(){
                document.getElementById('gifSol').style.display = 'none';
                document.getElementById('gifCloudy').style.display = 'none';
                document.getElementById('gifRain').style.display = 'none';
                document.getElementById('gifFrost').style.display = 'none';
            })
        }
