'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')

// prettier-ignore
const productData = [{"img":"https://images.unsplash.com/photo-1575406964630-13ab3760fbdf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTF8fHNtYWxsJTIwYm90dGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Obliqueseeded Jackbean","price":48510,"description":"suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam"},
{"img":"https://images.unsplash.com/photo-1557170334-a9632e77c6e4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAxfHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Kinnikinnick","price":41677,"description":"interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu"},
{"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAyfHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Parish's Milkvetch","price":87662,"description":"nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim"},
{"img":"https://images.unsplash.com/photo-1593086997231-5006a292b79a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA0fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Rockspray Cotoneaster","price":20924,"description":"morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id"},
{"img":"https://images.unsplash.com/photo-1587304791091-c9fbb7cbfda0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Tall Ironweed","price":98701,"description":"interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit"},
{"img":"https://images.unsplash.com/photo-1610245169249-c7fbf6768884?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTEwfHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Texas Beeblossom","price":34336,"description":"maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas"},
{"img":"https://images.unsplash.com/photo-1588680500458-16c827e78857?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE3fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Rock Clematis","price":27571,"description":"laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta"},
{"img":"https://images.unsplash.com/photo-1586026000208-70a4847797b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI1fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Yellow Flymallow","price":68679,"description":"mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at"},
{"img":"https://images.unsplash.com/photo-1601295445656-6db161fb654d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQxfHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Siskiyou False Hellebore","price":33622,"description":"nunc nisl duis bibendum felis sed interdum venenatis turpis enim"},
{"img":"https://images.unsplash.com/photo-1607506740454-58080fc74a4e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTYwfHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Blackthread Lichen","price":47207,"description":"nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est"},
{"img":"https://images.unsplash.com/photo-1608571702633-ef671c78ce25?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTc2fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"San Gabriel Ragwort","price":82482,"description":"lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit"},
{"img":"https://images.unsplash.com/photo-1591375372183-635d5e8917c6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTg0fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Thrift Seapink","price":9376,"description":"cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus"},
{"img":"https://images.unsplash.com/photo-1597915019487-2fb7ec721a0d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk1fHxzbWFsbCUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Desert Sulphur Lichen","price":3957,"description":"etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit"},
{"img":"https://robohash.org/fugiatessedolorem.png?size=50x50&set=set1","name":"Brachythecium Moss","price":78357,"description":"congue risus semper porta volutpat quam pede lobortis ligula sit amet"},
{"img":"https://robohash.org/ettotamaut.png?size=50x50&set=set1","name":"Munz's Tidytips","price":75247,"description":"luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur"},
{"img":"https://robohash.org/intemporibusaliquid.jpg?size=50x50&set=set1","name":"Hansen's Clover","price":3652,"description":"nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie"},
{"img":"https://robohash.org/atquedoloremquereprehenderit.jpg?size=50x50&set=set1","name":"Pearl Laceleaf","price":64800,"description":"arcu libero rutrum ac lobortis vel dapibus at diam nam"},
{"img":"https://robohash.org/voluptatessapienteest.bmp?size=50x50&set=set1","name":"Parry's Sedge","price":98824,"description":"tempus semper est quam pharetra magna ac consequat metus sapien"},
{"img":"https://robohash.org/nihilofficiisquis.bmp?size=50x50&set=set1","name":"Parrothead Indian Paintbrush","price":54202,"description":"luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat"},
{"img":"https://robohash.org/utvoluptatemquidem.png?size=50x50&set=set1","name":"Hairy Navel Lichen","price":1817,"description":"cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque"},
{"img":"https://robohash.org/maioresodioomnis.png?size=50x50&set=set1","name":"Chinese Holly","price":11686,"description":"felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed"},
{"img":"https://robohash.org/numquamatesse.jpg?size=50x50&set=set1","name":"Kunth's Evening Primrose","price":17501,"description":"ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat"},
{"img":"https://robohash.org/optioeosalias.bmp?size=50x50&set=set1","name":"Diospyros","price":68410,"description":"hac habitasse platea dictumst etiam faucibus cursus urna ut tellus"},
{"img":"https://robohash.org/errortemporealiquid.bmp?size=50x50&set=set1","name":"Tailed Grapefern","price":94186,"description":"in ante vestibulum ante ipsum primis in faucibus orci luctus et"},
{"img":"https://robohash.org/laboruminqui.bmp?size=50x50&set=set1","name":"Fayodia Lichen","price":3954,"description":"sed vestibulum sit amet cursus id turpis integer aliquet massa id"},
{"img":"https://robohash.org/doloremdolorumrem.png?size=50x50&set=set1","name":"Obliqueleaf Trumpets","price":97803,"description":"ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae"},
{"img":"https://robohash.org/placeateafacere.bmp?size=50x50&set=set1","name":"Burrobrush","price":63139,"description":"ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo"},
{"img":"https://robohash.org/utassumendaquia.jpg?size=50x50&set=set1","name":"Shortleaf Baccharis","price":64416,"description":"suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat"},
{"img":"https://robohash.org/porrovitaequae.jpg?size=50x50&set=set1","name":"Bluewitch Nightshade","price":84674,"description":"pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis"},
{"img":"https://robohash.org/ipsamautquis.bmp?size=50x50&set=set1","name":"Greenland Woodrush","price":87229,"description":"maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus"},
{"img":"https://robohash.org/quibusdamdelectusvero.png?size=50x50&set=set1","name":"Silky Beach Pea","price":38575,"description":"a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce"},
{"img":"https://robohash.org/quasidoloremqueaut.png?size=50x50&set=set1","name":"Blue Ridge Bittercress","price":50828,"description":"posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec"},
{"img":"https://robohash.org/consequunturautemvelit.jpg?size=50x50&set=set1","name":"Kruckeberg's Campion","price":96535,"description":"ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean"},
{"img":"https://robohash.org/voluptatesetreprehenderit.png?size=50x50&set=set1","name":"Clasping Milkweed","price":53837,"description":"turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis"},
{"img":"https://robohash.org/reiciendissolutanihil.png?size=50x50&set=set1","name":"Disc Lichen","price":70908,"description":"nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus"},
{"img":"https://robohash.org/animimollitialaboriosam.png?size=50x50&set=set1","name":"Bachman's Jelly Lichen","price":95714,"description":"curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel"},
{"img":"https://robohash.org/dolortemporaquis.bmp?size=50x50&set=set1","name":"Dwarf Birch","price":25267,"description":"molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas"},
{"img":"https://robohash.org/dolorlaudantiumsuscipit.png?size=50x50&set=set1","name":"Guadalupe Fescue","price":95234,"description":"pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo"},
{"img":"https://robohash.org/distinctioetomnis.jpg?size=50x50&set=set1","name":"Little Walnut","price":86175,"description":"turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor"},
{"img":"https://robohash.org/voluptatesdictain.jpg?size=50x50&set=set1","name":"Wart Lichen","price":63544,"description":"elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam"},
{"img":"https://robohash.org/atquenecessitatibuset.bmp?size=50x50&set=set1","name":"Brachelyma Moss","price":93663,"description":"nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat"},
{"img":"https://robohash.org/suntodioanimi.png?size=50x50&set=set1","name":"Archangel Bryum Moss","price":17878,"description":"semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum"},
{"img":"https://robohash.org/veniamrecusandaequi.bmp?size=50x50&set=set1","name":"Myrospermum","price":83139,"description":"aenean sit amet justo morbi ut odio cras mi pede"},
{"img":"https://robohash.org/sapientelaborumdolorem.bmp?size=50x50&set=set1","name":"Green Bulrush","price":79805,"description":"platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit"},
{"img":"https://robohash.org/delectusblanditiisquia.png?size=50x50&set=set1","name":"Florida Flatsedge","price":7597,"description":"ornare consequat lectus in est risus auctor sed tristique in tempus"},
{"img":"https://robohash.org/etconsequunturreiciendis.bmp?size=50x50&set=set1","name":"Tansyaster","price":75117,"description":"vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien"},
{"img":"https://robohash.org/atqueetvoluptas.png?size=50x50&set=set1","name":"Fissidens Moss","price":99440,"description":"sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis"},
{"img":"https://robohash.org/facereeaquequi.jpg?size=50x50&set=set1","name":"West Indian Spongeplant","price":97661,"description":"turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque"},
{"img":"https://robohash.org/faceresuntanimi.bmp?size=50x50&set=set1","name":"Wideflower Phlox","price":85223,"description":"nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti"},
{"img":"https://robohash.org/quivelharum.bmp?size=50x50&set=set1","name":"Narihira Bamboo","price":94871,"description":"quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices"},
{"img":"https://robohash.org/optioquieum.png?size=50x50&set=set1","name":"Halberd Fern","price":83102,"description":"luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin"},
{"img":"https://robohash.org/itaqueeligendised.bmp?size=50x50&set=set1","name":"Mottlecah","price":92485,"description":"suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum"},
{"img":"https://robohash.org/estullamrem.bmp?size=50x50&set=set1","name":"Warnstorfia Moss","price":18590,"description":"vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet"},
{"img":"https://robohash.org/quaerateaquedolore.jpg?size=50x50&set=set1","name":"Caribbean Beaksedge","price":45391,"description":"nullam varius nulla facilisi cras non velit nec nisi vulputate"},
{"img":"https://robohash.org/quaeratundeest.png?size=50x50&set=set1","name":"Fineleaf Waterdropwort","price":66378,"description":"nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros"},
{"img":"https://robohash.org/exercitationemquisquisquam.jpg?size=50x50&set=set1","name":"Agathis","price":38509,"description":"pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue"},
{"img":"https://robohash.org/saepeperferendisrepellat.bmp?size=50x50&set=set1","name":"Louisiana Rim Lichen","price":51638,"description":"sem fusce consequat nulla nisl nunc nisl duis bibendum felis"},
{"img":"https://robohash.org/liberoetfacilis.jpg?size=50x50&set=set1","name":"Sedge","price":13387,"description":"morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue"},
{"img":"https://robohash.org/autquidolorem.bmp?size=50x50&set=set1","name":"Hairysheath Lovegrass","price":34344,"description":"at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur"},
{"img":"https://robohash.org/deseruntdolorumducimus.bmp?size=50x50&set=set1","name":"Pore Lichen","price":79544,"description":"nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique"},
{"img":"https://robohash.org/velitetrepellat.bmp?size=50x50&set=set1","name":"Largeflower Onion","price":30042,"description":"cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi"},
{"img":"https://robohash.org/mollitiainventoreofficia.bmp?size=50x50&set=set1","name":"Aulacomnium Moss","price":94644,"description":"diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna"},
{"img":"https://robohash.org/idmolestiascum.bmp?size=50x50&set=set1","name":"Basket Of Gold","price":89108,"description":"dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in"},
{"img":"https://robohash.org/sequiminimasunt.jpg?size=50x50&set=set1","name":"Ovate Pterygoneurum Moss","price":20781,"description":"sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare"},
{"img":"https://robohash.org/animiillumdolore.jpg?size=50x50&set=set1","name":"Slender Hairgrass","price":50163,"description":"mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus"},
{"img":"https://robohash.org/remautqui.jpg?size=50x50&set=set1","name":"Summer Grape","price":91892,"description":"in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus"},
{"img":"https://robohash.org/sedetaut.jpg?size=50x50&set=set1","name":"Shoebutton","price":24518,"description":"luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui"},
{"img":"https://robohash.org/quisasperioresveritatis.jpg?size=50x50&set=set1","name":"Handsome Beardtongue","price":55509,"description":"laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed"},
{"img":"https://robohash.org/etofficiisinventore.png?size=50x50&set=set1","name":"Floating Pondweed","price":21506,"description":"metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis"},
{"img":"https://robohash.org/exveritatisanimi.jpg?size=50x50&set=set1","name":"Rim Lichen","price":59734,"description":"vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque"},
{"img":"https://robohash.org/nobisetaut.bmp?size=50x50&set=set1","name":"Broadleaf Caper","price":68534,"description":"donec ut mauris eget massa tempor convallis nulla neque libero convallis eget"},
{"img":"https://robohash.org/insitsuscipit.jpg?size=50x50&set=set1","name":"Bugseed","price":15377,"description":"iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec"},
{"img":"https://robohash.org/debitishicvoluptatem.bmp?size=50x50&set=set1","name":"Largeleaf Maidenhair","price":98301,"description":"ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum"},
{"img":"https://robohash.org/voluptatemperferendisatque.bmp?size=50x50&set=set1","name":"Dwarf Scouringrush","price":75364,"description":"ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit"},
{"img":"https://robohash.org/quisquamundecommodi.png?size=50x50&set=set1","name":"Rhizoma Peanut","price":22651,"description":"nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede"},
{"img":"https://robohash.org/sittemporibusprovident.bmp?size=50x50&set=set1","name":"Guadalupe Oak","price":98932,"description":"justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna"},
{"img":"https://robohash.org/accusantiumquasiest.jpg?size=50x50&set=set1","name":"Lodgepole Lupine","price":88096,"description":"tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas"},
{"img":"https://robohash.org/consequunturimpeditarchitecto.bmp?size=50x50&set=set1","name":"Hoary Tansyaster","price":20073,"description":"etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida"},
{"img":"https://robohash.org/corruptieaqueaccusantium.jpg?size=50x50&set=set1","name":"Oregon Eurhynchium Moss","price":95034,"description":"ipsum ac tellus semper interdum mauris ullamcorper purus sit amet"},
{"img":"https://robohash.org/sapienteminusest.bmp?size=50x50&set=set1","name":"Red Hills Soap Plant","price":29934,"description":"interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est"},
{"img":"https://robohash.org/praesentiumlaborumaut.jpg?size=50x50&set=set1","name":"Sundew","price":15343,"description":"turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec"},
{"img":"https://robohash.org/sapientenumquamdebitis.jpg?size=50x50&set=set1","name":"Mauritia","price":64522,"description":"accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam"},
{"img":"https://robohash.org/aspernaturvoluptatembeatae.bmp?size=50x50&set=set1","name":"Tuna","price":3975,"description":"donec quis orci eget orci vehicula condimentum curabitur in libero ut massa"},
{"img":"https://robohash.org/veroerroroptio.bmp?size=50x50&set=set1","name":"Spreading Bulrush","price":67007,"description":"duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam"},
{"img":"https://robohash.org/adebitisdelectus.bmp?size=50x50&set=set1","name":"Hierba Del Sapo","price":78458,"description":"nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit"},
{"img":"https://robohash.org/delenitiquaein.jpg?size=50x50&set=set1","name":"Bloomer's Aster","price":36391,"description":"felis fusce posuere felis sed lacus morbi sem mauris laoreet"},
{"img":"https://robohash.org/officiisipsamautem.png?size=50x50&set=set1","name":"Shieldplant","price":71739,"description":"posuere cubilia curae nulla dapibus dolor vel est donec odio justo"},
{"img":"https://robohash.org/nisiabdolorem.jpg?size=50x50&set=set1","name":"Debeque Phacelia","price":86059,"description":"in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem"},
{"img":"https://robohash.org/aliassequilabore.jpg?size=50x50&set=set1","name":"Mountain Ball Cactus","price":38199,"description":"rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut"},
{"img":"https://robohash.org/nobistemporeea.jpg?size=50x50&set=set1","name":"Smallanthus","price":3010,"description":"purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient"},
{"img":"https://robohash.org/nihilinciduntquis.jpg?size=50x50&set=set1","name":"Stone Rubberweed","price":43383,"description":"integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui"},
{"img":"https://robohash.org/quiasedhic.bmp?size=50x50&set=set1","name":"Java Plum","price":97421,"description":"eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat"},
{"img":"https://robohash.org/quiautemut.png?size=50x50&set=set1","name":"Chocolateweed","price":68604,"description":"placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis"},
{"img":"https://robohash.org/consequaturquiquisquam.png?size=50x50&set=set1","name":"Common Bugle","price":65074,"description":"turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis"},
{"img":"https://robohash.org/uteumquia.png?size=50x50&set=set1","name":"Spotted Peperomia","price":45397,"description":"condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque"},
{"img":"https://robohash.org/quiaquieum.png?size=50x50&set=set1","name":"Threetip Sagebrush","price":7988,"description":"ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac"},
{"img":"https://robohash.org/distinctioautlibero.bmp?size=50x50&set=set1","name":"Dictyonema Lichen","price":78108,"description":"libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum"},
{"img":"https://robohash.org/oditvelet.jpg?size=50x50&set=set1","name":"Burnet Saxifrage","price":74550,"description":"rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa"},
{"img":"https://robohash.org/dignissimosanimitemporibus.png?size=50x50&set=set1","name":"Burrowing Four O'clock","price":90548,"description":"quis tortor id nulla ultrices aliquet maecenas leo odio condimentum"},
{"img":"https://robohash.org/eadoloremdoloremque.bmp?size=50x50&set=set1","name":"Duss' Tonguefern","price":16115,"description":"odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas"},
{"img":"https://robohash.org/autnemoet.png?size=50x50&set=set1","name":"Veitch's Screwpine","price":24824,"description":"accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi"},
{"img":"https://robohash.org/harumnatuseaque.jpg?size=50x50&set=set1","name":"Eastern Mojave Buckwheat","price":23458,"description":"habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt"},
{"img":"https://robohash.org/inomnisvoluptatem.jpg?size=50x50&set=set1","name":"Broom Wattle","price":8213,"description":"nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam"},
{"img":"https://robohash.org/laudantiumdolorumconsequatur.jpg?size=50x50&set=set1","name":"African Horned Cucumber","price":12222,"description":"orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem"},
{"img":"https://robohash.org/doloresvoluptatumnulla.png?size=50x50&set=set1","name":"Cacao Rojo","price":56571,"description":"nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor"},
{"img":"https://robohash.org/velbeataesed.jpg?size=50x50&set=set1","name":"Cape-primrose","price":82784,"description":"ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris"},
{"img":"https://robohash.org/quammolestiasipsum.png?size=50x50&set=set1","name":"Bur Bristlegrass","price":64887,"description":"nunc donec quis orci eget orci vehicula condimentum curabitur in"},
{"img":"https://robohash.org/isteconsequaturearum.bmp?size=50x50&set=set1","name":"Marshmeadow Indian Paintbrush","price":78770,"description":"duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam"},
{"img":"https://robohash.org/cupiditatetemporevero.jpg?size=50x50&set=set1","name":"Custer Milkvetch","price":29717,"description":"tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie"},
{"img":"https://robohash.org/teneturetillo.png?size=50x50&set=set1","name":"Spiked Crested Coralroot","price":36233,"description":"faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo"},
{"img":"https://robohash.org/nemoesseporro.png?size=50x50&set=set1","name":"Annual Polemonium","price":39141,"description":"non ligula pellentesque ultrices phasellus id sapien in sapien iaculis"},
{"img":"https://robohash.org/undedolortotam.jpg?size=50x50&set=set1","name":"Pale False Mannagrass","price":82245,"description":"nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum"},
{"img":"https://robohash.org/veritatisconsequaturaut.png?size=50x50&set=set1","name":"Cornflag","price":3323,"description":"rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin"},
{"img":"https://robohash.org/veritatisfacilisea.jpg?size=50x50&set=set1","name":"Layne's Monkeyflower","price":9652,"description":"tristique est et tempus semper est quam pharetra magna ac"},
{"img":"https://robohash.org/harumamethic.jpg?size=50x50&set=set1","name":"Blue Ridge Blueberry","price":6265,"description":"potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus"},
{"img":"https://robohash.org/ullamrepellendusmagnam.png?size=50x50&set=set1","name":"Woolly Chaffhead","price":82303,"description":"penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis"},
{"img":"https://robohash.org/temporibusmolestiaenisi.jpg?size=50x50&set=set1","name":"Pseudanamomis","price":53244,"description":"venenatis tristique fusce congue diam id ornare imperdiet sapien urna"},
{"img":"https://robohash.org/errormollitiatenetur.jpg?size=50x50&set=set1","name":"Cup Lichen","price":52322,"description":"vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl"},
{"img":"https://robohash.org/omnisexplicaboofficia.png?size=50x50&set=set1","name":"Dixie Whitetop Aster","price":88226,"description":"ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur"},
{"img":"https://robohash.org/quianatusin.png?size=50x50&set=set1","name":"Guadeloupe Bonnet Orchid","price":79664,"description":"eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed"},
{"img":"https://robohash.org/cumqueexvel.bmp?size=50x50&set=set1","name":"Wislizenus' False Threadleaf","price":49807,"description":"justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi"},
{"img":"https://robohash.org/delenitivelitqui.bmp?size=50x50&set=set1","name":"Matted Lichen","price":83630,"description":"felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque"},
{"img":"https://robohash.org/corruptiistevoluptatem.jpg?size=50x50&set=set1","name":"Tweedy's Pussypaws","price":90641,"description":"suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa"},
{"img":"https://robohash.org/quidemquodplaceat.bmp?size=50x50&set=set1","name":"Downy Phlox","price":63073,"description":"sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet"},
{"img":"https://robohash.org/minimaperspiciatisnon.bmp?size=50x50&set=set1","name":"Browne's Savory","price":28099,"description":"augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus"},
{"img":"https://robohash.org/maximequoanimi.bmp?size=50x50&set=set1","name":"Bottlebrush Buckeye","price":35160,"description":"vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna"},
{"img":"https://robohash.org/verorecusandaesed.jpg?size=50x50&set=set1","name":"Pacific Hairgrass","price":42367,"description":"odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit"},
{"img":"https://robohash.org/ipsarepellenduscupiditate.jpg?size=50x50&set=set1","name":"Ocmulgee Skullcap","price":72563,"description":"velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis"},
{"img":"https://robohash.org/laborepossimusmaxime.jpg?size=50x50&set=set1","name":"Texas Star","price":81732,"description":"aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate"},
{"img":"https://robohash.org/similiqueearumofficiis.jpg?size=50x50&set=set1","name":"Wickes' Loeskypnum Moss","price":49707,"description":"justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo"},
{"img":"https://robohash.org/praesentiumnostrumreiciendis.png?size=50x50&set=set1","name":"Rock Lupine","price":23920,"description":"proin at turpis a pede posuere nonummy integer non velit donec diam neque"},
{"img":"https://robohash.org/exquasimpedit.bmp?size=50x50&set=set1","name":"Threehearts","price":81506,"description":"morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id"},
{"img":"https://robohash.org/facereetplaceat.jpg?size=50x50&set=set1","name":"Romulea","price":85158,"description":"mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet"},
{"img":"https://robohash.org/etperspiciatisqui.bmp?size=50x50&set=set1","name":"Tetraclea","price":20992,"description":"amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis"},
{"img":"https://robohash.org/oditarchitectosunt.png?size=50x50&set=set1","name":"Graygreen Maiden Fern","price":22946,"description":"molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst"},
{"img":"https://robohash.org/sequiinventoredolore.bmp?size=50x50&set=set1","name":"Field Locoweed","price":11607,"description":"adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc"},
{"img":"https://robohash.org/eiusesseveritatis.png?size=50x50&set=set1","name":"Myriotrema Lichen","price":7791,"description":"sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel"},
{"img":"https://robohash.org/maximealiasvel.jpg?size=50x50&set=set1","name":"Scarlet Cinquefoil","price":12175,"description":"lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in"},
{"img":"https://robohash.org/minimaodioofficiis.jpg?size=50x50&set=set1","name":"Devil's Potato","price":55150,"description":"pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in"},
{"img":"https://robohash.org/recusandaevelconsequatur.png?size=50x50&set=set1","name":"Purple Mountain Saxifrage","price":68584,"description":"nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu pede"},
{"img":"https://robohash.org/consequunturoptiomaiores.jpg?size=50x50&set=set1","name":"Fissidens Moss","price":91901,"description":"rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus"},
{"img":"https://robohash.org/doloresvoluptatemipsa.bmp?size=50x50&set=set1","name":"Italian Plumeless Thistle","price":44207,"description":"interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet"},
{"img":"https://robohash.org/impeditteneturillum.png?size=50x50&set=set1","name":"Bamboo Orchid","price":65894,"description":"vestibulum proin eu mi nulla ac enim in tempor turpis"},
{"img":"https://robohash.org/etvoluptatemitaque.bmp?size=50x50&set=set1","name":"Heartleaf Twayblade","price":39036,"description":"ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus"},
{"img":"https://robohash.org/delectusrerumvoluptatem.bmp?size=50x50&set=set1","name":"Annual Monsterwort","price":22311,"description":"mollis molestie lorem quisque ut erat curabitur gravida nisi at"},
{"img":"https://robohash.org/recusandaeutdeserunt.png?size=50x50&set=set1","name":"Rosette Lichen","price":43121,"description":"luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante"},
{"img":"https://robohash.org/auttenetura.bmp?size=50x50&set=set1","name":"Rooseveltweed","price":5644,"description":"tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis"},
{"img":"https://robohash.org/atqueestsint.jpg?size=50x50&set=set1","name":"Cracked Lichen","price":63489,"description":"odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac"},
{"img":"https://robohash.org/voluptasquiin.png?size=50x50&set=set1","name":"Jade Plant","price":74706,"description":"pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis"},
{"img":"https://robohash.org/idcupiditatequia.bmp?size=50x50&set=set1","name":"Marsh Cudweed","price":66153,"description":"lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis"},
{"img":"https://robohash.org/ametaspernaturquo.png?size=50x50&set=set1","name":"Shockley's Evening Primrose","price":10223,"description":"rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas"},
{"img":"https://robohash.org/dolorumliberoipsam.png?size=50x50&set=set1","name":"White Hoarypea","price":81591,"description":"volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut"},
{"img":"https://robohash.org/ipsamnulladolores.png?size=50x50&set=set1","name":"Star Reindeer Lichen","price":43636,"description":"nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu"},
{"img":"https://robohash.org/molestiasitaquerem.bmp?size=50x50&set=set1","name":"Tracy's Willow","price":75358,"description":"hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt"},
{"img":"https://robohash.org/inventorequamaccusantium.jpg?size=50x50&set=set1","name":"Turkeypeas","price":99942,"description":"eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis"},
{"img":"https://robohash.org/dignissimoserrorid.jpg?size=50x50&set=set1","name":"Degener's Cyanea","price":86248,"description":"pretium nisl ut volutpat sapien arcu sed augue aliquam erat"},
{"img":"https://robohash.org/doloresexplicaboquaerat.bmp?size=50x50&set=set1","name":"Arizona Mimosa","price":13778,"description":"fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat"},
{"img":"https://robohash.org/sintrerumlabore.png?size=50x50&set=set1","name":"Tallow Wood","price":38643,"description":"tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse"},
{"img":"https://robohash.org/velitaaliquid.png?size=50x50&set=set1","name":"Sweet-nancy","price":35253,"description":"non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa"},
{"img":"https://robohash.org/quaeratisteofficiis.jpg?size=50x50&set=set1","name":"Goatsbeard","price":3416,"description":"ante ipsum primis in faucibus orci luctus et ultrices posuere"},
{"img":"https://robohash.org/eosmodiaut.png?size=50x50&set=set1","name":"Faurie's Panicgrass","price":9020,"description":"id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat"},
{"img":"https://robohash.org/dignissimosremdolorum.bmp?size=50x50&set=set1","name":"Diamond Burbark","price":20577,"description":"diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue"},
{"img":"https://robohash.org/nonvoluptatibusquibusdam.jpg?size=50x50&set=set1","name":"Tussock Bellflower","price":45884,"description":"sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi"},
{"img":"https://robohash.org/perferendisminuseum.jpg?size=50x50&set=set1","name":"Bigleaf Crownbeard","price":11209,"description":"morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem"},
{"img":"https://robohash.org/estasperioreseligendi.png?size=50x50&set=set1","name":"Gum Bully","price":9949,"description":"suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus"},
{"img":"https://robohash.org/sapienteasperioresut.png?size=50x50&set=set1","name":"Nodding Locoweed","price":63499,"description":"dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium"},
{"img":"https://robohash.org/consequunturquiaex.png?size=50x50&set=set1","name":"Small Skullcap","price":85827,"description":"cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus"},
{"img":"https://robohash.org/deseruntetdebitis.jpg?size=50x50&set=set1","name":"Coastal Sandalwood","price":54617,"description":"purus aliquet at feugiat non pretium quis lectus suspendisse potenti in"},
{"img":"https://robohash.org/repellatutautem.png?size=50x50&set=set1","name":"Monterey Manzanita","price":24417,"description":"amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi"},
{"img":"https://robohash.org/solutavoluptatumquod.jpg?size=50x50&set=set1","name":"Septicweed","price":48138,"description":"lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl"},
{"img":"https://robohash.org/porrohicnumquam.bmp?size=50x50&set=set1","name":"Fritillary","price":95035,"description":"aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed"},
{"img":"https://robohash.org/inventoreutdicta.bmp?size=50x50&set=set1","name":"Arizona Madrone","price":35666,"description":"lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet"},
{"img":"https://robohash.org/iureiddistinctio.jpg?size=50x50&set=set1","name":"Philadelphia Blackberry","price":99988,"description":"dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis"},
{"img":"https://robohash.org/sitadet.bmp?size=50x50&set=set1","name":"Kauai Korthal Mistletoe","price":90686,"description":"nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in"},
{"img":"https://robohash.org/ducimusvelitid.bmp?size=50x50&set=set1","name":"Austria Timmia Moss","price":48011,"description":"cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac"},
{"img":"https://robohash.org/inciduntmolestiaeoccaecati.jpg?size=50x50&set=set1","name":"Melanelia Lichen","price":51691,"description":"neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris"},
{"img":"https://robohash.org/distinctioimpeditrepellendus.bmp?size=50x50&set=set1","name":"Smallflower Touchmenot","price":74464,"description":"metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna"},
{"img":"https://robohash.org/errordoloremfacilis.png?size=50x50&set=set1","name":"Pore Lichen","price":85400,"description":"platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at"},
{"img":"https://robohash.org/laboriosamatquecumque.jpg?size=50x50&set=set1","name":"Barbula Moss","price":32973,"description":"nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis"},
{"img":"https://robohash.org/doloreomnissuscipit.png?size=50x50&set=set1","name":"Harrington's Cephalotaxus","price":3830,"description":"nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit"},
{"img":"https://robohash.org/architectovoluptateeos.jpg?size=50x50&set=set1","name":"Secund Jewelflower","price":99544,"description":"consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede"},
{"img":"https://robohash.org/etquivelit.bmp?size=50x50&set=set1","name":"Earth Lichen","price":55291,"description":"morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra"},
{"img":"https://robohash.org/aoccaecatinobis.png?size=50x50&set=set1","name":"Mt. Kaala Melicope","price":42553,"description":"amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum"},
{"img":"https://robohash.org/facereliberoquo.jpg?size=50x50&set=set1","name":"Gray Mangrove","price":56338,"description":"ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti"},
{"img":"https://robohash.org/inametexpedita.jpg?size=50x50&set=set1","name":"Bigelow's Tansyaster","price":32877,"description":"at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis"},
{"img":"https://robohash.org/exvoluptatemexpedita.jpg?size=50x50&set=set1","name":"Marsh Violet","price":56175,"description":"orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti"},
{"img":"https://robohash.org/autemsedadipisci.png?size=50x50&set=set1","name":"Dwarf Century Plant","price":56803,"description":"vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus"},
{"img":"https://robohash.org/abeiusqui.jpg?size=50x50&set=set1","name":"Wart Lichen","price":78616,"description":"sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia"},
{"img":"https://robohash.org/solutanonsint.bmp?size=50x50&set=set1","name":"Narrowleaf Knotweed","price":13117,"description":"orci luctus et ultrices posuere cubilia curae nulla dapibus dolor"},
{"img":"https://robohash.org/nostrumquosea.jpg?size=50x50&set=set1","name":"Whitestem Goldenbush","price":30888,"description":"adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu"},
{"img":"https://robohash.org/necessitatibusenimquas.bmp?size=50x50&set=set1","name":"Athel Tamarisk","price":13692,"description":"et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin"},
{"img":"https://robohash.org/sequidoloresporro.png?size=50x50&set=set1","name":"Red Maple","price":95736,"description":"justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan"},
{"img":"https://robohash.org/eligendiadet.png?size=50x50&set=set1","name":"Schaerer's Disc Lichen","price":63477,"description":"curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus"},
{"img":"https://robohash.org/harumconsequaturperferendis.png?size=50x50&set=set1","name":"Coca","price":57757,"description":"penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis"},
{"img":"https://robohash.org/quaeomnistempore.jpg?size=50x50&set=set1","name":"Parish's Slender Meadowfoam","price":58550,"description":"elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium"},
{"img":"https://robohash.org/rerumfugiattemporibus.png?size=50x50&set=set1","name":"Pinewoods Drymary","price":37973,"description":"a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit"},
{"img":"https://robohash.org/voluptatemrerumet.bmp?size=50x50&set=set1","name":"Yellowspine Thistle","price":55843,"description":"nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate"},
{"img":"https://robohash.org/exvelquas.bmp?size=50x50&set=set1","name":"Hairy Goldenrod","price":48518,"description":"amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"},
{"img":"https://robohash.org/utdolorumdolor.png?size=50x50&set=set1","name":"San Luis Obispo Nightshade","price":83569,"description":"sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien"},
{"img":"https://robohash.org/fugiatutmolestiae.png?size=50x50&set=set1","name":"Platyhypnidium Moss","price":16376,"description":"in eleifend quam a odio in hac habitasse platea dictumst maecenas ut"}]
//prettier-enable

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const panda = await User.create({
    firstName: 'Panda',
    lastName: 'Shadow',
    email: 'lilpandie@aol.com',
    password: 'whaDDup',
    addressLine1: '312 Gingerbread Lane',
    addressLine2: 'apartment 1',
    city: 'Boston',
    state: 'MA'
  })
  const tuba = await User.create({
    firstName: 'Tuba',
    lastName: 'Bisson',
    email: 'tubaB@gmail.com',
    password: 'tuba',
    addressLine1: '12 College Street',
    addressLine2: 'apartment 3',
    city: 'Hamden',
    state: 'CT'
  })
  const lizzie = await User.create({
    firstName: 'Lizzie',
    lastName: 'Stover',
    email: 'babyheadlizzie@yahoo.com',
    password: 'mealworm',
    addressLine1: '12 College Street',
    addressLine2: 'apartment 3',
    city: 'Hamden',
    state: 'CT',
    isAdmin: true
  })
  const kris = await User.create({
    firstName: 'Kris',
    lastName: 'Jenner',
    email: 'kris@aol.com',
    password: 'money',
    addressLine1: '123 Hidden Hills',
    addressLine2: '',
    city: 'Calabasas',
    state: 'CA',
    isAdmin: true
  })
  const deloba = await User.create({
    firstName: 'Deloba',
    lastName: 'Shapland',
    email: 'dobie@aol.com',
    password: 'woofw00f47',
    addressLine1: '45 Marshmallow Road',
    addressLine2: 'apartment 3',
    city: 'Brooklyn',
    state: 'NY',
    isAdmin: true
  })
  const percy = await User.create({
    firstName: 'Percy',
    lastName: 'Rivera',
    email: 'kittybaby@hotmail.com',
    password: 'meow',
    addressLine1: '45 Marshmallow Road',
    addressLine2: 'apartment 3',
    city: 'Brooklyn',
    state: 'NY'
  })
  const andie = await User.create({
    firstName: 'Andy',
    lastName: 'Manalo',
    email: 'andy@puppies.com',
    password: 'iLuvtr3ats',
    addressLine1: '777 Ice Cream Island',
    addressLine2: 'apartment 7',
    city: 'Brooklyn',
    state: 'NY',
    isAdmin: true
  })
  const lola = await User.create({
    firstName: 'Lola',
    lastName: 'Nefores',
    email: 'lola@yahoo.com',
    password: 'hiLola97',
    addressLine1: '20 Hamburger Street',
    addressLine2: 'apartment 2',
    city: 'New York',
    state: 'NY'
  })

  const pandaCart = await Cart.create({
    sessionId: 'h31e6FhjQG9En-ctAeYlAxAtzU7Mi3Rl'
  })
  const krisCart = await Cart.create({
    sessionId: 'p24e6FhjQG9En-ctAeYlAxAtzU7Mi3Rl'
  })
  const tubaCart = await Cart.create({
    sessionId: 'MFWvhUCvwmaFEDDbWyKI_StYKXNvDFLr'
  })
  const lizzieCart = await Cart.create({
    sessionId: 'MFWvhUCvwmaFDwDbWyKI_StYKXNvDFLr'
  })
  const delobaCart = await Cart.create({
    sessionId: 'MFWvhUCvwmaFkDDbWyKI_StYKXNvDFLr'
  })
  const percyCart = await Cart.create({
    sessionId: 'MFWvhUCvwmaFsDDbWyKI_StYKXNvDFLr'
  })
  const andieCart = await Cart.create({
    sessionId: 'MFWvhUCvwmaFlDDbWyKI_StYKXNvDFLr'
  })
  const lolaCart = await Cart.create({
    sessionId: 'MFWvhUCvwmaFrDDbWyKI_StYKXNvDFLr'
  })

  const potion = await Product.create({
    img:
      'https://i.pinimg.com/236x/a9/e8/1e/a9e81e5feed2cc716f777d3380badc92--essential-oils-homemade-hair.jpg',
    name: `Kanye West's Tears`,
    price: 30000,
    description:
      "He's very sad that he is going to lose a lot of money after Kim divorces him."
  })
  const potion2 = await Product.create({
    img:
      'https://images.unsplash.com/photo-1587304432247-578ed294754f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzl8fHNtYWxsJTIwYm90dGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: `The Illusion`,
    price: 30000,
    description: 'this potion will make you 1000% cooler'
  })
  const potion3 = await Product.create({
    img:
      'https://images.unsplash.com/photo-1592842312669-1c6a0dc6dc21?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODh8fHNtYWxsJTIwYm90dGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    name: 'The Antidote',
    price: 4000,
    description: 'take this to cure poisoning of any kind'
  })
  const potion4 = await Product.create({
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7pFy3DaXkAo_1nq2NhQcSiisDZpHN9YjcQ&usqp=CAU',
    name: `Justin Bieber's Sweat`,
    price: 2000,
    description:
      'As Bieber resides in the United States, he is reported to possess an O-1 visa for temporary resident status, based on "extraordinary ability or achievement" in a field. Bieber has said he is not interested in obtaining US citizenship, and has praised Canada as being "the best country in the world", citing its mostly government-funded health care system as a model example. However, in September 2018, TMZ reported that Bieber had begun the process of becoming an American citizen, following his marriage to Hailey Baldwin.'
  })
  const potion5 = await Product.create({
    img:
      'https://i.pinimg.com/236x/a9/e8/1e/a9e81e5feed2cc716f777d3380badc92--essential-oils-homemade-hair.jpg',
    name: `Kim Kardashian's Tears`,
    price: 3000,
    description:
      "By 2018, according to Business Insider, Kardashian was charging $720,000 per Instagram post. Even though engagement data indicates that her posts are worth slightly less, she is regularly making headlines and this allows her to demand a premium above any calculated Instagram sponsored post price. Kardashian made a cameo appearance in the heist film Ocean's 8, which was released on June 8, 2018. In 2019, Kardashian made waves at the Met Gala with her figure hugging corset-induced Thierry Mugler dress."
  })
  const potion6 = await Product.create({
    img:
      'https://www.gannett-cdn.com/-mm-/606a139d72980f1cad6e124238ba8a6f01e32f2a/c=17-0-692-900/local/-/media/2015/02/10/12thandbroad/12thandbroad/635591575784138321-original-etched-apothecary-bottle-love-potion-no9.jpg?quality=50&width=640',
    name: 'Love Potion ',
    price: 5000,
    description:
      '“Make heart medicine on Fridays,” says Suhaly Bautista-Carolina, 33, an herbalist and community organizer in Brooklyn. In several ancient societies, Friday was associated with a goddess of love, like Venus. In pop culture today, love potions often drug people into a kind of aphrodisiac-fueled craze, subverting individual freewill. A love potion shouldn’t be about trickery, Bautista-Carolina believes; it should be about self-realization. “The first step in being able to love someone else requires you to activate your self-love,” she says. A potion, which she defines as “a practical recipe plus magic,” might help you get there.'
  })

  await pandaCart.setUser(panda)
  await pandaCart.addProduct(potion, {through: {qty: 12}})

  await krisCart.setUser(kris)
  await krisCart.addProduct(potion2, {through: {qty: 19}})

  await tubaCart.setUser(tuba)
  await tubaCart.addProduct(potion)
  await tubaCart.addProduct(potion3)

  await lizzieCart.setUser(lizzie)
  await lizzieCart.addProduct(potion5)

  await delobaCart.setUser(deloba)
  await delobaCart.addProduct(potion4)

  await percyCart.setUser(percy)
  await percyCart.addProduct(potion3)

  await andieCart.setUser(andie)
  await andieCart.addProduct(potion6)

  await lolaCart.setUser(lola)
  await lolaCart.addProduct(potion6)

  // await Promise.all(productData.map((product) => Product.create(product)))

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
