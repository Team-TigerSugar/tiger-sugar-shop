'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')

// prettier-ignore
const userData = [{"firstName":"Ursuline","lastName":"Wellman","email":"uwellman0@joomla.org","city":"Albuquerque","state":"New Mexico","addressLine1":"0 Maple Crossing"},
{"firstName":"Celinka","lastName":"Pieper","email":"cpieper1@theguardian.com","city":"Indianapolis","state":"Indiana","addressLine1":"595 Parkside Point"},
{"firstName":"Vikki","lastName":"Jobe","email":"vjobe2@vkontakte.ru","city":"North Las Vegas","state":"Nevada","addressLine1":"9 Monument Lane"},
{"firstName":"Tomaso","lastName":"Ghent","email":"tghent3@unblog.fr","city":"Dallas","state":"Texas","addressLine1":"1950 Rowland Hill"},
{"firstName":"Brynn","lastName":"Thormann","email":"bthormann4@aboutads.info","city":"Washington","state":"District of Columbia","addressLine1":"31374 Dottie Avenue"},
{"firstName":"Karry","lastName":"De Simoni","email":"kdesimoni5@bandcamp.com","city":"Newton","state":"Massachusetts","addressLine1":"86 Old Shore Point"},
{"firstName":"Issy","lastName":"Nettleship","email":"inettleship6@t.co","city":"Atlanta","state":"Georgia","addressLine1":"1949 Cambridge Place"},
{"firstName":"Merla","lastName":"Flanaghan","email":"mflanaghan7@mayoclinic.com","city":"San Jose","state":"California","addressLine1":"59605 Transport Junction"},
{"firstName":"Even","lastName":"Mingauld","email":"emingauld8@ibm.com","city":"El Paso","state":"Texas","addressLine1":"62782 Debra Drive"},
{"firstName":"Lindsay","lastName":"Guilloneau","email":"lguilloneau9@disqus.com","city":"Paterson","state":"New Jersey","addressLine1":"2370 Corry Hill"},
{"firstName":"Vanny","lastName":"Abbe","email":"vabbea@weibo.com","city":"Atlanta","state":"Georgia","addressLine1":"13 Tennyson Avenue"},
{"firstName":"Alyosha","lastName":"Wyper","email":"awyperb@ft.com","city":"Washington","state":"District of Columbia","addressLine1":"1 5th Drive"},
{"firstName":"Petronille","lastName":"Dearle-Palser","email":"pdearlepalserc@dagondesign.com","city":"Pueblo","state":"Colorado","addressLine1":"34310 Truax Crossing"},
{"firstName":"Jacki","lastName":"Barlass","email":"jbarlassd@oakley.com","city":"Augusta","state":"Georgia","addressLine1":"2 Northland Way"},
{"firstName":"Devlin","lastName":"Obey","email":"dobeye@vk.com","city":"Orlando","state":"Florida","addressLine1":"8302 Dahle Circle"},
{"firstName":"Gav","lastName":"Henfre","email":"ghenfref@tiny.cc","city":"San Antonio","state":"Texas","addressLine1":"79593 Kingsford Street"},
{"firstName":"Giraldo","lastName":"Hawkswood","email":"ghawkswoodg@cargocollective.com","city":"Canton","state":"Ohio","addressLine1":"813 Randy Way"},
{"firstName":"Reynold","lastName":"Pickavant","email":"rpickavanth@edublogs.org","city":"Oklahoma City","state":"Oklahoma","addressLine1":"6066 Merchant Court"},
{"firstName":"Sybyl","lastName":"Gittens","email":"sgittensi@japanpost.jp","city":"Saint Petersburg","state":"Florida","addressLine1":"80 Fuller Way"},
{"firstName":"Magnum","lastName":"Glozman","email":"mglozmanj@liveinternet.ru","city":"Norfolk","state":"Virginia","addressLine1":"5671 Reindahl Junction"},
{"firstName":"Gaile","lastName":"Begin","email":"gbegink@domainmarket.com","city":"Fort Worth","state":"Texas","addressLine1":"8 Towne Court"},
{"firstName":"Virgie","lastName":"Blondelle","email":"vblondellel@usnews.com","city":"Irvine","state":"California","addressLine1":"28 Dorton Point"},
{"firstName":"Bethina","lastName":"Sinnie","email":"bsinniem@gnu.org","city":"Washington","state":"District of Columbia","addressLine1":"0180 Sachs Terrace"},
{"firstName":"Delmar","lastName":"Armiger","email":"darmigern@plala.or.jp","city":"San Bernardino","state":"California","addressLine1":"32459 Red Cloud Avenue"},
{"firstName":"Franny","lastName":"Burner","email":"fburnero@redcross.org","city":"Roanoke","state":"Virginia","addressLine1":"539 Oriole Avenue"},
{"firstName":"Georgiana","lastName":"Hollier","email":"ghollierp@usnews.com","city":"Harrisburg","state":"Pennsylvania","addressLine1":"87 Gerald Junction"},
{"firstName":"Mateo","lastName":"Votier","email":"mvotierq@i2i.jp","city":"Columbia","state":"South Carolina","addressLine1":"96 Shasta Crossing"},
{"firstName":"Zaria","lastName":"Steinham","email":"zsteinhamr@wikia.com","city":"Detroit","state":"Michigan","addressLine1":"43 Spenser Avenue"},
{"firstName":"Noella","lastName":"Daout","email":"ndaouts@squidoo.com","city":"Chicago","state":"Illinois","addressLine1":"57 Fallview Pass"},
{"firstName":"Ariadne","lastName":"McCheyne","email":"amccheynet@phoca.cz","city":"Houston","state":"Texas","addressLine1":"63494 Luster Lane"},
{"firstName":"Dale","lastName":"Cleeves","email":"dcleevesu@gravatar.com","city":"Erie","state":"Pennsylvania","addressLine1":"65 Del Sol Plaza"},
{"firstName":"Colas","lastName":"Puve","email":"cpuvev@google.es","city":"Inglewood","state":"California","addressLine1":"9 Buhler Alley"},
{"firstName":"Kissie","lastName":"Hagart","email":"khagartw@comsenz.com","city":"San Francisco","state":"California","addressLine1":"73 Thierer Lane"},
{"firstName":"Ernie","lastName":"Dunlap","email":"edunlapx@home.pl","city":"Sacramento","state":"California","addressLine1":"12 Sauthoff Court"},
{"firstName":"Storm","lastName":"Cudworth","email":"scudworthy@bluehost.com","city":"Nashville","state":"Tennessee","addressLine1":"4433 3rd Way"},
{"firstName":"Raffaello","lastName":"MacPherson","email":"rmacphersonz@163.com","city":"Jacksonville","state":"Florida","addressLine1":"47 La Follette Pass"},
{"firstName":"Jonas","lastName":"Franzini","email":"jfranzini10@github.com","city":"Fort Wayne","state":"Indiana","addressLine1":"4 Crownhardt Plaza"},
{"firstName":"Karel","lastName":"Cometto","email":"kcometto11@reference.com","city":"Washington","state":"District of Columbia","addressLine1":"598 Schmedeman Hill"},
{"firstName":"Isidora","lastName":"Littlefair","email":"ilittlefair12@wordpress.com","city":"Chattanooga","state":"Tennessee","addressLine1":"21174 8th Pass"},
{"firstName":"Timmy","lastName":"Scogin","email":"tscogin13@noaa.gov","city":"Visalia","state":"California","addressLine1":"81285 Holmberg Trail"},
{"firstName":"Claiborne","lastName":"Marzello","email":"cmarzello14@tripadvisor.com","city":"Grand Rapids","state":"Michigan","addressLine1":"06849 Merry Place"},
{"firstName":"Dennie","lastName":"Castaignet","email":"dcastaignet15@kickstarter.com","city":"Denton","state":"Texas","addressLine1":"79839 Cambridge Parkway"},
{"firstName":"Isaiah","lastName":"Larmor","email":"ilarmor16@vinaora.com","city":"Falls Church","state":"Virginia","addressLine1":"48 Oneill Plaza"},
{"firstName":"Araldo","lastName":"Glowacha","email":"aglowacha17@goodreads.com","city":"Tacoma","state":"Washington","addressLine1":"67132 Bay Hill"},
{"firstName":"Tobi","lastName":"D'Alwis","email":"tdalwis18@latimes.com","city":"Madison","state":"Wisconsin","addressLine1":"0 Tony Pass"},
{"firstName":"Liesa","lastName":"Jarmaine","email":"ljarmaine19@baidu.com","city":"Kansas City","state":"Kansas","addressLine1":"2904 Graedel Park"},
{"firstName":"Moina","lastName":"Leatham","email":"mleatham1a@sakura.ne.jp","city":"Santa Monica","state":"California","addressLine1":"38 Butternut Way"},
{"firstName":"Cash","lastName":"Petrello","email":"cpetrello1b@instagram.com","city":"Phoenix","state":"Arizona","addressLine1":"3 Valley Edge Hill"},
{"firstName":"Haily","lastName":"Triggle","email":"htriggle1c@parallels.com","city":"Atlanta","state":"Georgia","addressLine1":"1 Dapin Way"},
{"firstName":"Biddie","lastName":"Thomkins","email":"bthomkins1d@163.com","city":"Boston","state":"Massachusetts","addressLine1":"3409 Clyde Gallagher Alley"},
{"firstName":"Amitie","lastName":"Govey","email":"agovey1e@cbc.ca","city":"Columbus","state":"Ohio","addressLine1":"1494 Bashford Crossing"},
{"firstName":"Stace","lastName":"Degenhardt","email":"sdegenhardt1f@businesswire.com","city":"Port Saint Lucie","state":"Florida","addressLine1":"7836 Morning Terrace"},
{"firstName":"Janina","lastName":"Nower","email":"jnower1g@dedecms.com","city":"Omaha","state":"Nebraska","addressLine1":"59029 Anderson Drive"},
{"firstName":"Gordan","lastName":"Wilmott","email":"gwilmott1h@dion.ne.jp","city":"Inglewood","state":"California","addressLine1":"4724 Ilene Court"},
{"firstName":"Flem","lastName":"Dunston","email":"fdunston1i@goodreads.com","city":"Melbourne","state":"Florida","addressLine1":"590 7th Road"},
{"firstName":"Quinn","lastName":"Romans","email":"qromans1j@japanpost.jp","city":"Schenectady","state":"New York","addressLine1":"05507 Luster Point"},
{"firstName":"Morie","lastName":"Mattioni","email":"mmattioni1k@prlog.org","city":"Grand Rapids","state":"Michigan","addressLine1":"21 Hazelcrest Park"},
{"firstName":"Elvina","lastName":"Walcar","email":"ewalcar1l@ucla.edu","city":"Pomona","state":"California","addressLine1":"48727 Havey Place"},
{"firstName":"Brooks","lastName":"Spellward","email":"bspellward1m@cam.ac.uk","city":"Colorado Springs","state":"Colorado","addressLine1":"2516 Crescent Oaks Center"},
{"firstName":"Filia","lastName":"Mcasparan","email":"fmcasparan1n@aol.com","city":"Philadelphia","state":"Pennsylvania","addressLine1":"47 Heath Center"},
{"firstName":"Wynn","lastName":"Pinyon","email":"wpinyon1o@marriott.com","city":"Boston","state":"Massachusetts","addressLine1":"6295 Roxbury Trail"},
{"firstName":"Lorrin","lastName":"Hoovart","email":"lhoovart1p@theguardian.com","city":"North Little Rock","state":"Arkansas","addressLine1":"86 Morningstar Hill"},
{"firstName":"Ebba","lastName":"Tromans","email":"etromans1q@hud.gov","city":"Portland","state":"Oregon","addressLine1":"283 Oriole Court"},
{"firstName":"Kordula","lastName":"Mussetti","email":"kmussetti1r@zimbio.com","city":"San Antonio","state":"Texas","addressLine1":"311 Forest Dale Point"},
{"firstName":"Boycey","lastName":"Kepe","email":"bkepe1s@bbc.co.uk","city":"Winter Haven","state":"Florida","addressLine1":"8 Elgar Lane"},
{"firstName":"Kristin","lastName":"Soigoux","email":"ksoigoux1t@aol.com","city":"Baton Rouge","state":"Louisiana","addressLine1":"712 Westridge Court"},
{"firstName":"Osmond","lastName":"Tibald","email":"otibald1u@youtu.be","city":"Sacramento","state":"California","addressLine1":"9744 Towne Pass"},
{"firstName":"Suellen","lastName":"Loffill","email":"sloffill1v@pinterest.com","city":"Philadelphia","state":"Pennsylvania","addressLine1":"89 Bartillon Point"},
{"firstName":"Jo","lastName":"Zanetti","email":"jzanetti1w@usa.gov","city":"Berkeley","state":"California","addressLine1":"61964 Clarendon Parkway"},
{"firstName":"Hollyanne","lastName":"McDiarmid","email":"hmcdiarmid1x@google.fr","city":"Lincoln","state":"Nebraska","addressLine1":"210 Lakeland Court"},
{"firstName":"Rolfe","lastName":"Kovelmann","email":"rkovelmann1y@admin.ch","city":"Fort Worth","state":"Texas","addressLine1":"45 Upham Place"},
{"firstName":"Elicia","lastName":"Phelps","email":"ephelps1z@wufoo.com","city":"Washington","state":"District of Columbia","addressLine1":"1 Redwing Court"},
{"firstName":"Massimo","lastName":"de Mendoza","email":"mdemendoza20@behance.net","city":"Raleigh","state":"North Carolina","addressLine1":"54 Haas Alley"},
{"firstName":"Shelba","lastName":"Hryniewicki","email":"shryniewicki21@walmart.com","city":"Omaha","state":"Nebraska","addressLine1":"29250 Reinke Center"},
{"firstName":"Mella","lastName":"Drust","email":"mdrust22@goo.gl","city":"Migrate","state":"Kentucky","addressLine1":"5781 Bellgrove Place"},
{"firstName":"Seamus","lastName":"Fairbrace","email":"sfairbrace23@icq.com","city":"Saint Paul","state":"Minnesota","addressLine1":"2739 Barby Road"},
{"firstName":"Stearn","lastName":"Fitzjohn","email":"sfitzjohn24@yahoo.com","city":"Youngstown","state":"Ohio","addressLine1":"04618 Trailsway Hill"},
{"firstName":"Filberto","lastName":"Markwelley","email":"fmarkwelley25@blog.com","city":"Oklahoma City","state":"Oklahoma","addressLine1":"293 Ridgeway Point"},
{"firstName":"Dunstan","lastName":"Ford","email":"dford26@chicagotribune.com","city":"Miami","state":"Florida","addressLine1":"457 Boyd Alley"},
{"firstName":"Babara","lastName":"McNicol","email":"bmcnicol27@cbslocal.com","city":"Houston","state":"Texas","addressLine1":"0811 Fuller Hill"},
{"firstName":"Abigail","lastName":"Richardet","email":"arichardet28@netlog.com","city":"Chicago","state":"Illinois","addressLine1":"97400 Old Gate Court"},
{"firstName":"Kerrie","lastName":"McJarrow","email":"kmcjarrow29@github.com","city":"Pittsburgh","state":"Pennsylvania","addressLine1":"61 Montana Crossing"},
{"firstName":"Alys","lastName":"Doyland","email":"adoyland2a@engadget.com","city":"Denver","state":"Colorado","addressLine1":"0 Paget Junction"},
{"firstName":"Porty","lastName":"Gross","email":"pgross2b@yelp.com","city":"Littleton","state":"Colorado","addressLine1":"35375 Dahle Pass"},
{"firstName":"Carlyle","lastName":"Rudwell","email":"crudwell2c@privacy.gov.au","city":"Columbia","state":"South Carolina","addressLine1":"34 Stang Trail"},
{"firstName":"Dudley","lastName":"Muffin","email":"dmuffin2d@wikimedia.org","city":"Dallas","state":"Texas","addressLine1":"88717 Chive Place"},
{"firstName":"Cariotta","lastName":"Roffey","email":"croffey2e@webs.com","city":"Seattle","state":"Washington","addressLine1":"8 Park Meadow Circle"},
{"firstName":"Myra","lastName":"O'Noulane","email":"monoulane2f@youtu.be","city":"New York City","state":"New York","addressLine1":"517 Sunnyside Alley"},
{"firstName":"Roseanne","lastName":"Soigne","email":"rsoigne2g@wordpress.com","city":"Houston","state":"Texas","addressLine1":"495 Miller Avenue"},
{"firstName":"Opaline","lastName":"Waszkiewicz","email":"owaszkiewicz2h@theatlantic.com","city":"Youngstown","state":"Ohio","addressLine1":"1 Green Point"},
{"firstName":"Jessie","lastName":"Pischoff","email":"jpischoff2i@engadget.com","city":"North Hollywood","state":"California","addressLine1":"26 Summer Ridge Junction"},
{"firstName":"Jolynn","lastName":"Boak","email":"jboak2j@topsy.com","city":"Salt Lake City","state":"Utah","addressLine1":"027 Delladonna Trail"},
{"firstName":"Levy","lastName":"Millhill","email":"lmillhill2k@lycos.com","city":"Madison","state":"Wisconsin","addressLine1":"482 Lillian Point"},
{"firstName":"Zsa zsa","lastName":"Jeffry","email":"zjeffry2l@ycombinator.com","city":"Waco","state":"Texas","addressLine1":"23700 Clove Place"},
{"firstName":"Shelba","lastName":"Gather","email":"sgather2m@wiley.com","city":"Santa Ana","state":"California","addressLine1":"15251 Grayhawk Pass"},
{"firstName":"Tarra","lastName":"Arunowicz","email":"tarunowicz2n@squarespace.com","city":"Arlington","state":"Texas","addressLine1":"776 Dunning Place"},
{"firstName":"Rina","lastName":"Aleksic","email":"raleksic2o@nature.com","city":"Las Vegas","state":"Nevada","addressLine1":"43769 Esch Road"},
{"firstName":"Donny","lastName":"Vokins","email":"dvokins2p@smugmug.com","city":"Washington","state":"District of Columbia","addressLine1":"15 Bowman Way"},
{"firstName":"Moishe","lastName":"Gosart","email":"mgosart2q@wikia.com","city":"Colorado Springs","state":"Colorado","addressLine1":"95 Springview Lane"},
{"firstName":"Winnie","lastName":"Drinkhall","email":"wdrinkhall2r@list-manage.com","city":"San Diego","state":"California","addressLine1":"71619 Caliangt Hill"}]
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
{"img":"https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Brachythecium Moss","price":78357,"description":"congue risus semper porta volutpat quam pede lobortis ligula sit amet"},
{"img":"https://images.unsplash.com/photo-1588018025171-0581d0189080?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Munz's Tidytips","price":75247,"description":"luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur"},
{"img":"https://images.unsplash.com/photo-1571206508927-2ef3026ada5d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Hansen's Clover","price":3652,"description":"nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie"},
{"img":"https://images.unsplash.com/photo-1535683577427-740aaac4ec25?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Pearl Laceleaf","price":64800,"description":"arcu libero rutrum ac lobortis vel dapibus at diam nam"},
{"img":"https://images.unsplash.com/photo-1589493676751-8f4a014d95e5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Parry's Sedge","price":98824,"description":"tempus semper est quam pharetra magna ac consequat metus sapien"}]
// {"img":"https://images.unsplash.com/photo-1595425959632-34f2822322ce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Parrothead Indian Paintbrush","price":54202,"description":"luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat"},
// {"img":"https://images.unsplash.com/photo-1561997835-49889d0e0355?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Hairy Navel Lichen","price":1817,"description":"cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque"},
// {"img":"https://images.unsplash.com/photo-1544468266-6a8948003cd7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Chinese Holly","price":11686,"description":"felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed"},
// {"img":"https://images.unsplash.com/photo-1533603208986-24fd819e718a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Kunth's Evening Primrose","price":17501,"description":"ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat"},
// {"img":"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Diospyros","price":68410,"description":"hac habitasse platea dictumst etiam faucibus cursus urna ut tellus"},
// {"img":"https://images.unsplash.com/photo-1541108564883-bec8126021f5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Tailed Grapefern","price":94186,"description":"in ante vestibulum ante ipsum primis in faucibus orci luctus et"},
// {"img":"https://images.unsplash.com/photo-1547887537-6158d64c35b3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Fayodia Lichen","price":3954,"description":"sed vestibulum sit amet cursus id turpis integer aliquet massa id"},
// {"img":"https://images.unsplash.com/photo-1611066527971-d124ddd5f65b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Obliqueleaf Trumpets","price":97803,"description":"ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae"},
// {"img":"https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlcmZ1bWV8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60","name":"Burrobrush","price":63139,"description":"ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo"},
// {"img":"https://images.unsplash.com/photo-1600680763979-eadfcbdb6a69?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTh8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Shortleaf Baccharis","price":64416,"description":"suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat"},
// {"img":"https://images.unsplash.com/photo-1593631487803-dac1b9775bdb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Bluewitch Nightshade","price":84674,"description":"pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis"},
// {"img":"https://images.unsplash.com/photo-1610540502378-c97e1e391e48?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzF8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Greenland Woodrush","price":87229,"description":"maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus"},
// {"img":"https://images.unsplash.com/photo-1458538977777-0549b2370168?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzh8fHBlcmZ1bWV8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60","name":"Silky Beach Pea","price":38575,"description":"a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce"},
// {"img":"https://images.unsplash.com/photo-1557861537-3420e39efdee?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTJ8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Blue Ridge Bittercress","price":50828,"description":"posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec"},
// {"img":"https://images.unsplash.com/photo-1575399659107-4a835f7f51a7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Kruckeberg's Campion","price":96535,"description":"ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean"},
// {"img":"https://images.unsplash.com/photo-1595002132705-f0144a4d6dec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Clasping Milkweed","price":53837,"description":"turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis"},
// {"img":"https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI0fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Disc Lichen","price":70908,"description":"nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus"},
// {"img":"https://images.unsplash.com/photo-1600634999627-c52556dff978?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTIyfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Bachman's Jelly Lichen","price":95714,"description":"curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Dwarf Birch","price":25267,"description":"molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas"},
// {"img":"https://images.unsplash.com/photo-1593487568720-92097fb460fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjV8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Guadalupe Fescue","price":95234,"description":"pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Little Walnut","price":86175,"description":"turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor"},
// {"img":"https://images.unsplash.com/photo-1600634999627-c52556dff978?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTIyfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Wart Lichen","price":63544,"description":"elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam"},
// {"img":"https://images.unsplash.com/photo-1547887537-6158d64c35b3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Brachelyma Moss","price":93663,"description":"nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat"},
// {"img":"https://images.unsplash.com/photo-1547887537-6158d64c35b3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Archangel Bryum Moss","price":17878,"description":"semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum"},
// {"img":"https://images.unsplash.com/photo-1547887537-6158d64c35b3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Myrospermum","price":83139,"description":"aenean sit amet justo morbi ut odio cras mi pede"},
// {"img":"https://images.unsplash.com/photo-1558038785-4fe65c791c99?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Green Bulrush","price":79805,"description":"platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit"},
// {"img":"https://images.unsplash.com/photo-1601295452898-78a8dd904ab3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTIzfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Florida Flatsedge","price":7597,"description":"ornare consequat lectus in est risus auctor sed tristique in tempus"},
// {"img":"https://images.unsplash.com/photo-1558038785-4fe65c791c99?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Tansyaster","price":75117,"description":"vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Fissidens Moss","price":99440,"description":"sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"West Indian Spongeplant","price":97661,"description":"turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Wideflower Phlox","price":85223,"description":"nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti"},
// {"img":"https://images.unsplash.com/photo-1607329128748-886236fb9a2f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Narihira Bamboo","price":94871,"description":"quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Halberd Fern","price":83102,"description":"luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin"},
// {"img":"https://images.unsplash.com/photo-1600427421441-4be84fbf7411?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Mottlecah","price":92485,"description":"suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum"},
// {"img":"https://images.unsplash.com/photo-1558038785-4fe65c791c99?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Warnstorfia Moss","price":18590,"description":"vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet"},
// {"img":"https://images.unsplash.com/photo-1558038785-4fe65c791c99?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Caribbean Beaksedge","price":45391,"description":"nullam varius nulla facilisi cras non velit nec nisi vulputate"},
// {"img":"https://images.unsplash.com/photo-1609590813308-1060d8bd9ca6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE0fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Fineleaf Waterdropwort","price":66378,"description":"nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros"},
// {"img":"https://images.unsplash.com/photo-1595002132705-f0144a4d6dec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Agathis","price":38509,"description":"pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue"},
// {"img":"https://images.unsplash.com/photo-1595002132705-f0144a4d6dec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Louisiana Rim Lichen","price":51638,"description":"sem fusce consequat nulla nisl nunc nisl duis bibendum felis"},
// {"img":"https://images.unsplash.com/photo-1595002132705-f0144a4d6dec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Sedge","price":13387,"description":"morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue"},
// {"img":"https://images.unsplash.com/photo-1595002132705-f0144a4d6dec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Hairysheath Lovegrass","price":34344,"description":"at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur"},
// {"img":"https://images.unsplash.com/photo-1593631487803-dac1b9775bdb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Pore Lichen","price":79544,"description":"nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique"},
// {"img":"https://images.unsplash.com/photo-1595002132705-f0144a4d6dec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Largeflower Onion","price":30042,"description":"cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi"},
// {"img":"https://images.unsplash.com/photo-1607329128748-886236fb9a2f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Aulacomnium Moss","price":94644,"description":"diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna"},
// {"img":"https://images.unsplash.com/photo-1607329128748-886236fb9a2f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Basket Of Gold","price":89108,"description":"dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in"},
// {"img":"https://images.unsplash.com/photo-1607329128748-886236fb9a2f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTI1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Ovate Pterygoneurum Moss","price":20781,"description":"sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare"},
// {"img":"https://images.unsplash.com/photo-1600680763979-eadfcbdb6a69?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTh8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Slender Hairgrass","price":50163,"description":"mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus"},
// {"img":"https://images.unsplash.com/photo-1600680725775-21c5927dbf74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQzfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Summer Grape","price":91892,"description":"in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus"},
// {"img":"https://images.unsplash.com/photo-1600680725775-21c5927dbf74?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQzfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Shoebutton","price":24518,"description":"luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Handsome Beardtongue","price":55509,"description":"laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Floating Pondweed","price":21506,"description":"metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis"},
// {"img":"https://images.unsplash.com/photo-1585218356022-6a53145f56f6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjJ8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Rim Lichen","price":59734,"description":"vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Broadleaf Caper","price":68534,"description":"donec ut mauris eget massa tempor convallis nulla neque libero convallis eget"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Bugseed","price":15377,"description":"iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Largeleaf Maidenhair","price":98301,"description":"ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Dwarf Scouringrush","price":75364,"description":"ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit"},
// {"img":"https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlcmZ1bWV8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60","name":"Rhizoma Peanut","price":22651,"description":"nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Guadalupe Oak","price":98932,"description":"justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Lodgepole Lupine","price":88096,"description":"tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas"},
// {"img":"https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Hoary Tansyaster","price":20073,"description":"etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida"},
// {"img":"https://images.unsplash.com/photo-1574154072693-b02ae5cab31f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Oregon Eurhynchium Moss","price":95034,"description":"ipsum ac tellus semper interdum mauris ullamcorper purus sit amet"},
// {"img":"https://images.unsplash.com/photo-1611066527971-d124ddd5f65b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Red Hills Soap Plant","price":29934,"description":"interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est"},
// {"img":"https://images.unsplash.com/photo-1574154072693-b02ae5cab31f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Sundew","price":15343,"description":"turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec"},
// {"img":"https://images.unsplash.com/photo-1574154072693-b02ae5cab31f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Mauritia","price":64522,"description":"accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam"},
// {"img":"https://images.unsplash.com/photo-1574154072693-b02ae5cab31f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQ1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Tuna","price":3975,"description":"donec quis orci eget orci vehicula condimentum curabitur in libero ut massa"},
// {"img":"https://images.unsplash.com/photo-1610245169254-1cfd8bd165bf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTUwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Spreading Bulrush","price":67007,"description":"duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam"},
// {"img":"https://images.unsplash.com/photo-1541108564883-bec8126021f5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Hierba Del Sapo","price":78458,"description":"nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit"},
// {"img":"https://images.unsplash.com/photo-1610245169254-1cfd8bd165bf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTUwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Bloomer's Aster","price":36391,"description":"felis fusce posuere felis sed lacus morbi sem mauris laoreet"},
// {"img":"https://images.unsplash.com/photo-1610245169254-1cfd8bd165bf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTUwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Shieldplant","price":71739,"description":"posuere cubilia curae nulla dapibus dolor vel est donec odio justo"},
// {"img":"https://images.unsplash.com/photo-1544490405-c0938d974942?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTU1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Debeque Phacelia","price":86059,"description":"in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem"},
// {"img":"https://images.unsplash.com/photo-1609590561141-39708fb9a86c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTc0fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Mountain Ball Cactus","price":38199,"description":"rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut"},
// {"img":"https://images.unsplash.com/photo-1533603208986-24fd819e718a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Smallanthus","price":3010,"description":"purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient"},
// {"img":"https://images.unsplash.com/photo-1584949513276-aa3a8f629a20?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTg1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Stone Rubberweed","price":43383,"description":"integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui"},
// {"img":"https://images.unsplash.com/photo-1584949513276-aa3a8f629a20?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTg1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Java Plum","price":97421,"description":"eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat"},
// {"img":"https://images.unsplash.com/photo-1579773836548-991252d06219?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Chocolateweed","price":68604,"description":"placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis"},
// {"img":"https://images.unsplash.com/photo-1579773836548-991252d06219?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Common Bugle","price":65074,"description":"turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis"},
// {"img":"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Spotted Peperomia","price":45397,"description":"condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque"},
// {"img":"https://images.unsplash.com/photo-1579773836548-991252d06219?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Threetip Sagebrush","price":7988,"description":"ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac"},
// {"img":"https://images.unsplash.com/photo-1579773836548-991252d06219?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Dictyonema Lichen","price":78108,"description":"libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum"},
// {"img":"https://images.unsplash.com/photo-1579773836548-991252d06219?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkwfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Burnet Saxifrage","price":74550,"description":"rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa"},
// {"img":"https://images.unsplash.com/photo-1543422655-cb586ad21df1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Burrowing Four O'clock","price":90548,"description":"quis tortor id nulla ultrices aliquet maecenas leo odio condimentum"},
// {"img":"https://images.unsplash.com/photo-1595425959632-34f2822322ce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Duss' Tonguefern","price":16115,"description":"odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas"},
// {"img":"https://images.unsplash.com/photo-1543422655-cb586ad21df1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Veitch's Screwpine","price":24824,"description":"accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi"},
// {"img":"https://images.unsplash.com/photo-1543422655-cb586ad21df1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Eastern Mojave Buckwheat","price":23458,"description":"habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt"},
// {"img":"https://images.unsplash.com/photo-1543422655-cb586ad21df1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Broom Wattle","price":8213,"description":"nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam"},
// {"img":"https://images.unsplash.com/photo-1543422655-cb586ad21df1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk1fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"African Horned Cucumber","price":12222,"description":"orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem"},
// {"img":"https://images.unsplash.com/photo-1535683577427-740aaac4ec25?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZnVtZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Cacao Rojo","price":56571,"description":"nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor"},
// {"img":"https://images.unsplash.com/photo-1584841247175-4d766cefa018?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkyfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Cape-primrose","price":82784,"description":"ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris"},
// {"img":"https://images.unsplash.com/photo-1584841247175-4d766cefa018?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTkyfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Bur Bristlegrass","price":64887,"description":"nunc donec quis orci eget orci vehicula condimentum curabitur in"},
// {"img":"https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Marshmeadow Indian Paintbrush","price":78770,"description":"duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam"},
// {"img":"https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Custer Milkvetch","price":29717,"description":"tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie"},
// {"img":"https://images.unsplash.com/photo-1560994152-ad15397f60e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcmZ1bWV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Spiked Crested Coralroot","price":36233,"description":"faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo"},
// {"img":"https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Annual Polemonium","price":39141,"description":"non ligula pellentesque ultrices phasellus id sapien in sapien iaculis"},
// {"img":"https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Pale False Mannagrass","price":82245,"description":"nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum"},
// {"img":"https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Cornflag","price":3323,"description":"rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin"},
// {"img":"https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjAxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Layne's Monkeyflower","price":9652,"description":"tristique est et tempus semper est quam pharetra magna ac"},
// {"img":"https://images.unsplash.com/photo-1594118252385-f190dc2ebcc1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA0fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Blue Ridge Blueberry","price":6265,"description":"potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus"},
// {"img":"https://images.unsplash.com/photo-1594118252385-f190dc2ebcc1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA0fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Woolly Chaffhead","price":82303,"description":"penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis"},
// {"img":"https://images.unsplash.com/photo-1610380888018-9f989a0d02d7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Pseudanamomis","price":53244,"description":"venenatis tristique fusce congue diam id ornare imperdiet sapien urna"},
// {"img":"https://images.unsplash.com/photo-1610380888018-9f989a0d02d7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Cup Lichen","price":52322,"description":"vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl"},
// {"img":"https://images.unsplash.com/photo-1610380888018-9f989a0d02d7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Dixie Whitetop Aster","price":88226,"description":"ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur"},
// {"img":"https://images.unsplash.com/photo-1610380888018-9f989a0d02d7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjA4fHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Guadeloupe Bonnet Orchid","price":79664,"description":"eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed"},
// {"img":"https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjIxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Wislizenus' False Threadleaf","price":49807,"description":"justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi"},
// {"img":"https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjIxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60https://robohash.org/delenitivelitqui.bmp?size=50x50&set=set1","name":"Matted Lichen","price":83630,"description":"felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque"},
// {"img":"https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjIxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Tweedy's Pussypaws","price":90641,"description":"suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa"},
// {"img":"https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjIxfHxwZXJmdW1lfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60","name":"Downy Phlox","price":63073,"description":"sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet"},]
// // {"img":"https://robohash.org/minimaperspiciatisnon.bmp?size=50x50&set=set1","name":"Browne's Savory","price":28099,"description":"augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus"},
// // {"img":"https://robohash.org/maximequoanimi.bmp?size=50x50&set=set1","name":"Bottlebrush Buckeye","price":35160,"description":"vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna"},
// // {"img":"https://robohash.org/verorecusandaesed.jpg?size=50x50&set=set1","name":"Pacific Hairgrass","price":42367,"description":"odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit"},
// // {"img":"https://robohash.org/ipsarepellenduscupiditate.jpg?size=50x50&set=set1","name":"Ocmulgee Skullcap","price":72563,"description":"velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis"},
// // {"img":"https://robohash.org/laborepossimusmaxime.jpg?size=50x50&set=set1","name":"Texas Star","price":81732,"description":"aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate"},
// // {"img":"https://robohash.org/similiqueearumofficiis.jpg?size=50x50&set=set1","name":"Wickes' Loeskypnum Moss","price":49707,"description":"justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo"},
// // {"img":"https://robohash.org/praesentiumnostrumreiciendis.png?size=50x50&set=set1","name":"Rock Lupine","price":23920,"description":"proin at turpis a pede posuere nonummy integer non velit donec diam neque"},
// // {"img":"https://robohash.org/exquasimpedit.bmp?size=50x50&set=set1","name":"Threehearts","price":81506,"description":"morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id"},
// // {"img":"https://robohash.org/facereetplaceat.jpg?size=50x50&set=set1","name":"Romulea","price":85158,"description":"mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet"},
// // {"img":"https://robohash.org/etperspiciatisqui.bmp?size=50x50&set=set1","name":"Tetraclea","price":20992,"description":"amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis"},
// // {"img":"https://robohash.org/oditarchitectosunt.png?size=50x50&set=set1","name":"Graygreen Maiden Fern","price":22946,"description":"molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst"},
// // {"img":"https://robohash.org/sequiinventoredolore.bmp?size=50x50&set=set1","name":"Field Locoweed","price":11607,"description":"adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc"},
// // {"img":"https://robohash.org/eiusesseveritatis.png?size=50x50&set=set1","name":"Myriotrema Lichen","price":7791,"description":"sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel"},
// // {"img":"https://robohash.org/maximealiasvel.jpg?size=50x50&set=set1","name":"Scarlet Cinquefoil","price":12175,"description":"lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in"},
// // {"img":"https://robohash.org/minimaodioofficiis.jpg?size=50x50&set=set1","name":"Devil's Potato","price":55150,"description":"pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in"},
// // {"img":"https://robohash.org/recusandaevelconsequatur.png?size=50x50&set=set1","name":"Purple Mountain Saxifrage","price":68584,"description":"nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu pede"},
// // {"img":"https://robohash.org/consequunturoptiomaiores.jpg?size=50x50&set=set1","name":"Fissidens Moss","price":91901,"description":"rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus"},
// // {"img":"https://robohash.org/doloresvoluptatemipsa.bmp?size=50x50&set=set1","name":"Italian Plumeless Thistle","price":44207,"description":"interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet"},
// // {"img":"https://robohash.org/impeditteneturillum.png?size=50x50&set=set1","name":"Bamboo Orchid","price":65894,"description":"vestibulum proin eu mi nulla ac enim in tempor turpis"},
// // {"img":"https://robohash.org/etvoluptatemitaque.bmp?size=50x50&set=set1","name":"Heartleaf Twayblade","price":39036,"description":"ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus"},
// // {"img":"https://robohash.org/delectusrerumvoluptatem.bmp?size=50x50&set=set1","name":"Annual Monsterwort","price":22311,"description":"mollis molestie lorem quisque ut erat curabitur gravida nisi at"},
// // {"img":"https://robohash.org/recusandaeutdeserunt.png?size=50x50&set=set1","name":"Rosette Lichen","price":43121,"description":"luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante"},
// // {"img":"https://robohash.org/auttenetura.bmp?size=50x50&set=set1","name":"Rooseveltweed","price":5644,"description":"tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis"},
// // {"img":"https://robohash.org/atqueestsint.jpg?size=50x50&set=set1","name":"Cracked Lichen","price":63489,"description":"odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac"},
// // {"img":"https://robohash.org/voluptasquiin.png?size=50x50&set=set1","name":"Jade Plant","price":74706,"description":"pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis"},
// // {"img":"https://robohash.org/idcupiditatequia.bmp?size=50x50&set=set1","name":"Marsh Cudweed","price":66153,"description":"lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis"},
// // {"img":"https://robohash.org/ametaspernaturquo.png?size=50x50&set=set1","name":"Shockley's Evening Primrose","price":10223,"description":"rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas"},
// // {"img":"https://robohash.org/dolorumliberoipsam.png?size=50x50&set=set1","name":"White Hoarypea","price":81591,"description":"volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut"},
// // {"img":"https://robohash.org/ipsamnulladolores.png?size=50x50&set=set1","name":"Star Reindeer Lichen","price":43636,"description":"nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu"},
// // {"img":"https://robohash.org/molestiasitaquerem.bmp?size=50x50&set=set1","name":"Tracy's Willow","price":75358,"description":"hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt"},
// // {"img":"https://robohash.org/inventorequamaccusantium.jpg?size=50x50&set=set1","name":"Turkeypeas","price":99942,"description":"eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis"},
// // {"img":"https://robohash.org/dignissimoserrorid.jpg?size=50x50&set=set1","name":"Degener's Cyanea","price":86248,"description":"pretium nisl ut volutpat sapien arcu sed augue aliquam erat"},
// // {"img":"https://robohash.org/doloresexplicaboquaerat.bmp?size=50x50&set=set1","name":"Arizona Mimosa","price":13778,"description":"fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat"},
// // {"img":"https://robohash.org/sintrerumlabore.png?size=50x50&set=set1","name":"Tallow Wood","price":38643,"description":"tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse"},
// // {"img":"https://robohash.org/velitaaliquid.png?size=50x50&set=set1","name":"Sweet-nancy","price":35253,"description":"non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa"},
// // {"img":"https://robohash.org/quaeratisteofficiis.jpg?size=50x50&set=set1","name":"Goatsbeard","price":3416,"description":"ante ipsum primis in faucibus orci luctus et ultrices posuere"},
// // {"img":"https://robohash.org/eosmodiaut.png?size=50x50&set=set1","name":"Faurie's Panicgrass","price":9020,"description":"id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat"},
// // {"img":"https://robohash.org/dignissimosremdolorum.bmp?size=50x50&set=set1","name":"Diamond Burbark","price":20577,"description":"diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue"},
// // {"img":"https://robohash.org/nonvoluptatibusquibusdam.jpg?size=50x50&set=set1","name":"Tussock Bellflower","price":45884,"description":"sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi"},
// // {"img":"https://robohash.org/perferendisminuseum.jpg?size=50x50&set=set1","name":"Bigleaf Crownbeard","price":11209,"description":"morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem"},
// // {"img":"https://robohash.org/estasperioreseligendi.png?size=50x50&set=set1","name":"Gum Bully","price":9949,"description":"suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus"},
// // {"img":"https://robohash.org/sapienteasperioresut.png?size=50x50&set=set1","name":"Nodding Locoweed","price":63499,"description":"dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium"},
// // {"img":"https://robohash.org/consequunturquiaex.png?size=50x50&set=set1","name":"Small Skullcap","price":85827,"description":"cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus"},
// // {"img":"https://robohash.org/deseruntetdebitis.jpg?size=50x50&set=set1","name":"Coastal Sandalwood","price":54617,"description":"purus aliquet at feugiat non pretium quis lectus suspendisse potenti in"},
// // {"img":"https://robohash.org/repellatutautem.png?size=50x50&set=set1","name":"Monterey Manzanita","price":24417,"description":"amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi"},
// // {"img":"https://robohash.org/solutavoluptatumquod.jpg?size=50x50&set=set1","name":"Septicweed","price":48138,"description":"lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl"},
// // {"img":"https://robohash.org/porrohicnumquam.bmp?size=50x50&set=set1","name":"Fritillary","price":95035,"description":"aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed"},
// // {"img":"https://robohash.org/inventoreutdicta.bmp?size=50x50&set=set1","name":"Arizona Madrone","price":35666,"description":"lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet"},
// // {"img":"https://robohash.org/iureiddistinctio.jpg?size=50x50&set=set1","name":"Philadelphia Blackberry","price":99988,"description":"dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis"},
// // {"img":"https://robohash.org/sitadet.bmp?size=50x50&set=set1","name":"Kauai Korthal Mistletoe","price":90686,"description":"nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in"},
// // {"img":"https://robohash.org/ducimusvelitid.bmp?size=50x50&set=set1","name":"Austria Timmia Moss","price":48011,"description":"cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac"},
// // {"img":"https://robohash.org/inciduntmolestiaeoccaecati.jpg?size=50x50&set=set1","name":"Melanelia Lichen","price":51691,"description":"neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris"},
// // {"img":"https://robohash.org/distinctioimpeditrepellendus.bmp?size=50x50&set=set1","name":"Smallflower Touchmenot","price":74464,"description":"metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna"},
// // {"img":"https://robohash.org/errordoloremfacilis.png?size=50x50&set=set1","name":"Pore Lichen","price":85400,"description":"platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at"},
// // {"img":"https://robohash.org/laboriosamatquecumque.jpg?size=50x50&set=set1","name":"Barbula Moss","price":32973,"description":"nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis"},
// // {"img":"https://robohash.org/doloreomnissuscipit.png?size=50x50&set=set1","name":"Harrington's Cephalotaxus","price":3830,"description":"nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit"},
// // {"img":"https://robohash.org/architectovoluptateeos.jpg?size=50x50&set=set1","name":"Secund Jewelflower","price":99544,"description":"consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede"},
// // {"img":"https://robohash.org/etquivelit.bmp?size=50x50&set=set1","name":"Earth Lichen","price":55291,"description":"morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra"},
// // {"img":"https://robohash.org/aoccaecatinobis.png?size=50x50&set=set1","name":"Mt. Kaala Melicope","price":42553,"description":"amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum"},
// // {"img":"https://robohash.org/facereliberoquo.jpg?size=50x50&set=set1","name":"Gray Mangrove","price":56338,"description":"ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti"},
// // {"img":"https://robohash.org/inametexpedita.jpg?size=50x50&set=set1","name":"Bigelow's Tansyaster","price":32877,"description":"at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis"},
// // {"img":"https://robohash.org/exvoluptatemexpedita.jpg?size=50x50&set=set1","name":"Marsh Violet","price":56175,"description":"orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti"},
// // {"img":"https://robohash.org/autemsedadipisci.png?size=50x50&set=set1","name":"Dwarf Century Plant","price":56803,"description":"vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus"},
// // {"img":"https://robohash.org/abeiusqui.jpg?size=50x50&set=set1","name":"Wart Lichen","price":78616,"description":"sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia"},
// // {"img":"https://robohash.org/solutanonsint.bmp?size=50x50&set=set1","name":"Narrowleaf Knotweed","price":13117,"description":"orci luctus et ultrices posuere cubilia curae nulla dapibus dolor"},
// // {"img":"https://robohash.org/nostrumquosea.jpg?size=50x50&set=set1","name":"Whitestem Goldenbush","price":30888,"description":"adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu"},
// // {"img":"https://robohash.org/necessitatibusenimquas.bmp?size=50x50&set=set1","name":"Athel Tamarisk","price":13692,"description":"et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin"},
// // {"img":"https://robohash.org/sequidoloresporro.png?size=50x50&set=set1","name":"Red Maple","price":95736,"description":"justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan"},
// // {"img":"https://robohash.org/eligendiadet.png?size=50x50&set=set1","name":"Schaerer's Disc Lichen","price":63477,"description":"curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus"},
// // {"img":"https://robohash.org/harumconsequaturperferendis.png?size=50x50&set=set1","name":"Coca","price":57757,"description":"penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis"},
// // {"img":"https://robohash.org/quaeomnistempore.jpg?size=50x50&set=set1","name":"Parish's Slender Meadowfoam","price":58550,"description":"elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium"},
// // {"img":"https://robohash.org/rerumfugiattemporibus.png?size=50x50&set=set1","name":"Pinewoods Drymary","price":37973,"description":"a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit"},
// // {"img":"https://robohash.org/voluptatemrerumet.bmp?size=50x50&set=set1","name":"Yellowspine Thistle","price":55843,"description":"nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate"},
// // {"img":"https://robohash.org/exvelquas.bmp?size=50x50&set=set1","name":"Hairy Goldenrod","price":48518,"description":"amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"},
// // {"img":"https://robohash.org/utdolorumdolor.png?size=50x50&set=set1","name":"San Luis Obispo Nightshade","price":83569,"description":"sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien"},
// // {"img":"https://robohash.org/fugiatutmolestiae.png?size=50x50&set=set1","name":"Platyhypnidium Moss","price":16376,"description":"in eleifend quam a odio in hac habitasse platea dictumst maecenas ut"}]
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

  await Promise.all(userData.map(user => User.create(user)))
  await Promise.all(productData.map(product => Product.create(product)))

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
