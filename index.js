 $(document).ready(function() {
	var accounts = [{'AccountNo':'1', 'Amount': 10000},
					{'AccountNo':'2', 'Amount': 20000}];
	var accountTransactions = [{'Amount':5000, 'Details':'Shoes', 'AccountNo':'1', 'Type':'Debit'},
								{'Amount':5000, 'Details':'Furniture', 'AccountNo':'2', 'Type':'Debit'}];

	function updateAccountBalance() {
		$("#balance").find('.content label').remove();
		var accountsNode = $("#balance").find('.content');
		for (var i = 0; i < accounts.length; i++) {
			var label = $('<label> Account '+accounts[i].AccountNo+': <span>'+accounts[i].Amount+'</span> </label>');
			accountsNode.append(label);
		}
	}

	function renderTransactionTable() {
		var transactionTable =  $('#transactionTable').find('tbody').html('');
		var containerHeight = $('.container').height();
		$('.container').height((containerHeight + 50) +'px');
		for (var i = 0; i < accountTransactions.length; i++) {
			var tr = $('<tr></tr>');
			tr.append($('<td>'+ (i+1) +'</td>'));

			for(property in accountTransactions[i])
			{   
				var td;
				if(property == 'AccountNo')
					td = $('<td>Account '+accountTransactions[i][property]+'</td>');
				else
					td = $('<td>'+accountTransactions[i][property]+'</td>');
				tr.append(td);
			}

			transactionTable.append(tr);
		}
	}
	
	$('#addTransaction').on('click', function(e) {
		var i = 0;
		var accountId =  $('#accountSelection').val();
		var amount = $('#amount').val();
		var details = $('#details').val();
		var accountType = $("input[name='accountType']:checked").val();

		if(isNaN(amount) || amount <= 0) {
			alert('Please enter valid amount');
			return;
		} 
		else if(details == '') {
			alert('Please enter some description about the expense!');
			return;
		}

		for (; i < accounts.length; i++) {
			if(accounts[i].AccountNo == accountId)
			{
				if(accountType == "Credit") {
					accounts[i].Amount = accounts[i].Amount + parseInt(amount);
				} else if(accountType = "Debit") {
					if(parseInt(amount) > accounts[i].Amount) {
						alert('Insufficient balance');
						return;
					}
					accounts[i].Amount = accounts[i].Amount - amount;	
				}
				var accountTransaction = {'Amount':amount, 'Details':details, 'AccountNo':accountId, 'Type': accountType};
				accountTransactions.push(accountTransaction);
				renderTransactionTable();
				break;
			}
		}
		if(i === accounts.length)
			alert('Select valid account nunber');

		updateAccountBalance();
	});

	updateAccountBalance();
	renderTransactionTable();
});