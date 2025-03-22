package  {
	
	import flash.display.*;
	import flash.events.*;
	import flash.net.*;
	import fl.controls.Slider;
	
	public class main extends MovieClip {
	
	
			public var startupsURL = new URLRequest("http://feeds.feedburner.com/techcrunch/startups");
			public var socialURL = new URLRequest("http://feeds.feedburner.com/techcrunch/social");
			public var gamingURL = new URLRequest("http://feeds.feedburner.com/techcrunch/Gaming");
			public var mobileURL = new URLRequest("http://feeds.feedburner.com/Mobilecrunch");
			public var gearURL = new URLRequest("http://feeds.feedburner.com/crunchgear");

			public var startupsLoader = new URLLoader();
			public var socialLoader = new URLLoader();
			public var gamingLoader = new URLLoader();
			public var mobileLoader = new URLLoader();
			public var gearLoader = new URLLoader();
			
			public var startupsXML;
			public var socialXML;
			public var gamingXML;
			public var mobileXML;
			public var gearXML;
			public var currentShown = "startup";
	
		
		public function main() {
			stop();
			loaderInfo.addEventListener(ProgressEvent.PROGRESS,loadProg);
		}
		
		public function loadProg(e:ProgressEvent):void{
			var percentage:Number = Math.floor((e.bytesLoaded/e.bytesTotal)*100);
			
			textPer.text = percentage + "%";
			loaderBar.gotoAndStop(percentage);
			if(percentage == 100){
				gotoAndStop(2);
				getFeeds();
				
				
			}
		}
		
		public function getFeeds()
		{
			slider.addEventListener(Event.CHANGE, function(){parseStuff(currentShown,slider.value)});
			doc.addEventListener(MouseEvent.MOUSE_UP, function(){gotoAndStop('doc')});
			startupsLoader.load(startupsURL);
			socialLoader.load(socialURL);
			gamingLoader.load(gamingURL);
			mobileLoader.load(mobileURL)
			gearLoader.load(gearURL);
			
			startupsLoader.addEventListener(Event.COMPLETE, traceOut('startup',10));
			socialLoader.addEventListener(Event.COMPLETE, traceOut('social',10));
			gamingLoader.addEventListener(Event.COMPLETE, traceOut('game',10));
			mobileLoader.addEventListener(Event.COMPLETE, traceOut('mobile',10));
			gearLoader.addEventListener(Event.COMPLETE, traceOut('gear',10));
			
			startupButton.addEventListener(MouseEvent.MOUSE_UP, function(){parseStuff('startup',slider.value)});
			gamingButton.addEventListener(MouseEvent.MOUSE_UP, function(){parseStuff('gaming',slider.value)});
			gearButton.addEventListener(MouseEvent.MOUSE_UP, function(){parseStuff('gear',slider.value)});
			mobileButton.addEventListener(MouseEvent.MOUSE_UP, function(){parseStuff('mobile',slider.value)});
			socialButton.addEventListener(MouseEvent.MOUSE_UP, function(){parseStuff('social',slider.value)});
			
		}
		
		
		
		public function traceOut(feedName:String, bar:int):Function {
		  return function(e:Event):void {
		  
		  
				if(feedName == 'startup')
				{
					startupsXML = startupsLoader.data;
					parseStuff(feedName, bar);
				}
				else if(feedName == 'social')
				{
					socialXML = socialLoader.data;
				}
				else if(feedName == 'game')
				{
					gamingXML = gamingLoader.data;
				}
				else if(feedName == 'mobile')
				{
					mobileXML = mobileLoader.data;
				}
				else if(feedName == 'gear')
				{
					gearXML = gearLoader.data;
				}
			
		  };
		}
		
		
		
			public function parseStuff(s:String, num)
			{
			var stringIn = s;
				textField.text = "";
				var numHeadlines = num
				textField.multiline = true;
				textField.wordWrap = true;
				if(stringIn == 'startup')
				{
					currentShown = 'startup';
					var xmlData:XML = new XML(startupsXML);
					var xmlItems:XMLList = xmlData.elements().item;
					for(var i=0;i<numHeadlines;i++)
					{
						textField.appendText(xmlItems.elements("title")[i].toString());
						textField.appendText('\n\n');
						scrollbar.update();
					};
					
				}
				else if(stringIn == 'gaming')
				{
					currentShown = 'gaming';
					var xmlData:XML = new XML(gamingXML);
					var xmlItems:XMLList = xmlData.elements().item;
					for(var i=0;i<numHeadlines;i++)
					{
						textField.appendText(xmlItems.elements("title")[i].toString());
						textField.appendText('\n\n');
						scrollbar.update();
					};
					
				}
				else if(stringIn == 'gear')
				{
					currentShown = 'gear';
					var xmlData:XML = new XML(gearXML);
					var xmlItems:XMLList = xmlData.elements().item;
					for(var i=0;i<numHeadlines;i++)
					{
						textField.appendText(xmlItems.elements("title")[i].toString());
						textField.appendText('\n\n');
						scrollbar.update();
					};
					
				}
				else if(stringIn == 'mobile')
				{
					currentShown = 'mobile';
					var xmlData:XML = new XML(mobileXML);
					var xmlItems:XMLList = xmlData.elements().item;
					for(var i=0;i<numHeadlines;i++)
					{
						textField.appendText(xmlItems.elements("title")[i].toString());
						textField.appendText('\n\n');
						scrollbar.update();
					};
					
				}
				else if(stringIn == 'social')
				{
					currentShown = 'social';
					var xmlData:XML = new XML(socialXML);
					var xmlItems:XMLList = xmlData.elements().item;
					for(var i=0;i<numHeadlines;i++)
					{
						textField.appendText(xmlItems.elements("title")[i].toString());
						textField.appendText('\n\n');
						scrollbar.update();
					};
					
				}
			
			}
		
		
		
	}
	
}
