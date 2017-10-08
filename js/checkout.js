

                function moneyTextToFloat(text){
                    var cleanText = text.replace("R$", "").replace(",",".");
                    return parseFloat(cleanText);
                }


                function moneyFloatToText(value){
                    var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
                    text = "R$ " + text;
                    return text.substr(0, text.length - 2) + "," + text.substr(-2);
                }

                function readTotal(){
                    var total =$('#total').text();
                    return moneyTextToFloat(total);
                }

                function writeTotal(value) {
                    var text = moneyFloatToText(value);
                    $("#total").text(text);
                }

                function calcTotalProducts(){

                    var products = $('.product');
                    var totalProducts = 0;

                    for(var pos = 0; pos < products.length; pos++) {
                        var $product = $(products[pos]);
                        var quantity = $product.find('.quantity').val();
                        var price = moneyTextToFloat($product.find('.price').text());
                        var subtotal = quantity*price;
                        $product.find('.sub-total').text(moneyFloatToText(subtotal));
                        totalProducts += subtotal;
                    }
                    return totalProducts;
                }

                $(document).ready(function() {

                    writeTotal(calcTotalProducts());

                    $(".quantity").change(function() {
                        writeTotal(calcTotalProducts());
                    });

                     $('.btn-plus').on('click',function(){

                        var $button =$(this);
                        var oldValue = $button.parent().find('.qtdProduct').val();
                        var idProduct = $button.parent().find('.idProduct').val();

                        
                        var newVal = parseFloat(oldValue) + 1;
                        
                        $.ajax({
                            type : 'POST',
                            url  : '../action/alterarQtdProduto.php',
                            data : "qtd="+newVal+"&idProduto="+idProduct,
                            dataType: 'json',
                            
                            success :  function(response){                      
                                if(response == 1){ 
                                    
                                }else{
                                    alert("Erro ao alterar a quantidade! Tente novamente!");
                                    
                                }
                            }
                        });
                        $button.parent().find(".qtdProduct").val(newVal);
                        writeTotal(calcTotalProducts());


                    });

                    $('.btn-minus').on('click',function(){
                        var $button =$(this);
                        var oldValue = $button.parent().find('.qtdProduct').val();
                        if(oldValue>0){
                            var newVal = parseFloat(oldValue) - 1;
                            var idProduct = $button.parent().find('.idProduct').val();

                           
                            
                            $.ajax({
                                type : 'POST',
                                url  : '../action/alterarQtdProduto.php',
                                data : "qtd="+newVal+"&idProduto="+idProduct,
                                dataType: 'json',
                                
                                success :  function(response){                      
                                    if(response == 1){ 
                                        
                                    }else{
                                        alert("Erro ao alterar a quantidade! Tente novamente!");
                                        
                                    }
                                }
                            });
                            $button.parent().find(".qtdProduct").val(newVal);
                            writeTotal(calcTotalProducts());
                        }

                    });

                });
