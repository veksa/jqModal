<html>
	<head>
		<title>example jqModal</title>
		<link href="/css/style.css" type="text/css" rel="stylesheet" />
		
		<script type="text/javascript" src="/js/jquery.js"></script>
		<script type="text/javascript" src="/js/jqModal.js"></script>
		<script type="text/javascript" src="/js/general.js"></script>
	</head>
	<body>
		<div class="container">
			
			<div class="link-price" style="display: none">
				<?=number_format( 10.568, '2', '.', 0 )?>
			</div>
			
			Обычное всплывающее окно:
			<span class="link" data-event="jqm" data-name="example" data-param-id="1" data-autoload-text1="test data input" data-autoloadhtml-price="link-price" data-autohide="location.reload();">Вызов всплывающего окна</span>
			<br/><br/>
			Всплывающее окно с прокруткой:
			<span class="link" data-event="jqm" data-name="example2" data-param-id="2" data-scroll="Y">Вызов всплывающего окна</span>
		</div>
	</body>
</html>