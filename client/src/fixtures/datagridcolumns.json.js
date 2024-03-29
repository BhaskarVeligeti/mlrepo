/* eslint-disable no-mixed-spaces-and-tabs*/
export const dataColumns = [
	{
		dataField: 'ordinal',
		text: 'ID',
		hidden: true
	},
	// {
	// 	dataField: 'month',
	// 	text: 'Month',
	// 	headerTitle: true,
	// 	headerAlign: 'center',
	// 	align: 'center',
	// 	// headerStyle: { width: '5%' },
	// },
	// {
	// 	dataField: 'year',
	// 	text: 'Year',
	// 	headerTitle: true,
	// 	headerAlign: 'center',
	// 	align: 'center',
	// 	// headerStyle: { width: '5%' },
	// },
	{
		dataField: 'rateaccount',
		text: 'RateAcc',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		// align: 'center',
		headerStyle: { width: '6%' },
	},
	{
		dataField: 'property',
		text: 'Property',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: "font-italic text-muted",
		headerStyle: { width: '18%' },
	},
	{
		dataField: 'sgid',
		text: 'SGID',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		// classes: "font-italic text-muted",
		headerStyle: { width: '14%' },
	},
	{
		dataField: 'type',
		text: 'ProType',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		headerStyle: { width: '8%' },
	},

	{
		dataField: 'streetnumber',
		text: 'StrNo',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		headerStyle: { width: '4%' },
	},

	{
		dataField: 'streetname',
		text: 'StrName',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// align: 'center',
		headerStyle: { width: '8%' },
	},

	{
		dataField: 'suburb',
		text: 'Suburb',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// align: 'center',
		headerStyle: { width: '8%' },
	},
	{
		dataField: 'account',
		text: 'Account',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '6%' },
	},

	{
		dataField: 'install',
		text: 'Install',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '6%' },
	},
	{
		dataField: 'device',
		text: 'Device',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '5%' },
	},

	{
		dataField: 'uomdesc',
		text: 'UOM',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '4%' },
	},
	{
		dataField: 'readings',
		text: 'Readings',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '6%' },
	},
	{
		dataField: 'randvalue',
		text: 'Predicted',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		classes: "font-italic text-danger",
		headerStyle: { width: '6%' },
	},
	{
		dataField: 'afterrandvalue',
		text: 'After',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		classes: "font-italic text-success",
		headerStyle: { width: '5%' },
	},
	
];

export const dataColumns2 = [
	{
		dataField: 'key',
		text: 'ID',
		hidden: true
	},

	{
		dataField: 'account',
		text: 'Account',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '12%' },
	},

	{
		dataField: 'install',
		text: 'Installation',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '12%' },
	},
	{
		dataField: 'device',
		text: 'Device',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '12%' },
	},

	{
		dataField: 'uomdesc',
		text: 'Unit of Measure',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '12%' },
	},
	{
		dataField: 'readings',
		text: 'Readings',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		// classes: 'text-primary',
		align: 'center',
		headerStyle: { width: '12%' },
	},
	{
		dataField: 'randvalue',
		text: 'Predicted',
		headerTitle: true,
		headerAlign: 'center',
		sort: true,
		align: 'center',
		classes: "font-italic text-success",
		headerStyle: { width: '12%' },
	},


];