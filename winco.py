import requests
from bs4 import BeautifulSoup
import os

page = requests.get('https://www.wincofoods.com/shop#/?page=1&pagesize=24&apply_user_tags=1')

#current_status = soup.find_all('h2',{'class':["pv-top-card-section__headline", 'mt1 inline-block t-18 t-black t-normal']}, limit=1)[0].next.strip()


def get_pages(directory="C:/Users/Dell/Desktop/winco"):
	pages = os.listdir(directory)
	return pages
pages = get_pages()

def scrape_page(pages):
	final = []
	
	for page in pages[:]:
		items,prices,images=[],[],[]
		soup = BeautifulSoup(open("C:/Users/Dell/Desktop/winco/"+page, encoding='utf-8'), 'html.parser')
		all_items = soup.find_all("div",{'class':"basic-info"})
		for item in all_items:
			print(len(items),len(prices))
			images.append(item.find("img"))
			items.append(item.find("h4",{'class':"item-name"}))
			prices.append(item.find("price-string"))
		#inputTag = price.find(attrs={"name" : "price-string"})
		
		for i in range(len(items)):
			final.append([items[i]['title'],prices[i]['price-string'],images[i]['lazy-img']])
	return final


final = scrape_page(pages)
print(final[:10])
print(len(final))
for i in final:
	if i[0] == "Bulk Bin #2147 - GOLDEN RAISINS (30 pounds)":
		print("Found")


