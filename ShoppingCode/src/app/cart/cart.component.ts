import { Component,} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{

    // ('.add-cart-large').each(function(i, el){
    //   (el).click(function(){
    //     var carousel = (this).parent().parent().find(".carousel-container");
    //     var img = carousel.find('img').eq(carousel.attr("rel"))[0];
    //     var position = (img).offset();

    //     var productName = (this).parent().find('h4').get(0).innerHTML;

    //     ("body").append('<div class="floating-cart"></div>');
    //     var cart = ('div.floating-cart');
    //     ("<img src='"+img.src+"' class='floating-image-large' />").appendTo(cart);

    //     (cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');
    //     setTimeout(function(){("body").addClass("MakeFloatingCart");}, 800);

    //     setTimeout(function(){
    //     ('div.floating-cart').remove();
    //     ("body").removeClass("MakeFloatingCart");


    //     var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+img.src+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";

    //     ("#cart .empty").hide();
    //     ("#cart").append(cartItem);
    //     ("#checkout").fadeIn(500);

    //     ("#cart .cart-item").last()
    //       .addClass("flash")
    //       .find(".delete-item").click(() =>{
    //         (this).parent().fadeOut(300, function(){
    //           (this).remove();
    //           if(("#cart .cart-item").size() == 0){
    //             ("#cart .empty").fadeIn(500);
    //             ("#checkout").fadeOut(500);
    //           }
    //         })
    //       });
    //        setTimeout(function(){
    //       ("#cart .cart-item").last().removeClass("flash");
    //     }, 10 );

    //   }, 1000);


    //   });
    // })
}
