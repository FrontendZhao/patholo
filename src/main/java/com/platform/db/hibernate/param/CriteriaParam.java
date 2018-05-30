package com.platform.db.hibernate.param;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

@SuppressWarnings("rawtypes")
public class CriteriaParam {
	// 条件Restrictions
	protected Disjunction disjunction = Restrictions.disjunction();
	protected Conjunction conjunction = Restrictions.conjunction();
	// 投影Projection
	protected ProjectionList projections = Projections.projectionList();
	// 排序Order
	protected List<Order> orders = new ArrayList<Order>();
	// 结果集开始位置
	protected Integer firstResult;
	// 从结果集取出多少条记录
	protected Integer maxResults;

	public Integer getFirstResult() {
		return firstResult;
	}

	public Integer getMaxResults() {
		return maxResults;
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~AND~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	public CriteriaParam idEq(Object value) {
		conjunction.add(Restrictions.idEq(value));
		return this;
	}

	public CriteriaParam eq(String propertyName, Object value) {
		conjunction.add(Restrictions.eq(propertyName, value));
		return this;
	}

	public CriteriaParam eqOrIsNull(String propertyName, Object value) {
		conjunction.add(Restrictions.eqOrIsNull(propertyName, value));
		return this;

	}

	public CriteriaParam ne(String propertyName, Object value) {
		conjunction.add(Restrictions.ne(propertyName, value));
		return this;
	}

	public CriteriaParam neOrIsNotNull(String propertyName, Object value) {
		conjunction.add(Restrictions.neOrIsNotNull(propertyName, value));
		return this;
	}

	public CriteriaParam like(String propertyName, Object value) {
		conjunction.add(Restrictions.like(propertyName, String.valueOf(value),
				MatchMode.ANYWHERE));
		return this;
	}

	public CriteriaParam like(String propertyName, String value,
			MatchMode matchMode) {
		conjunction.add(Restrictions.like(propertyName, value, matchMode));
		return this;
	}

	public CriteriaParam ilike(String propertyName, String value,
			MatchMode matchMode) {
		conjunction.add(Restrictions.ilike(propertyName, value, matchMode));
		return this;
	}

	public CriteriaParam ilike(String propertyName, Object value) {
		conjunction.add(Restrictions.ilike(propertyName, String.valueOf(value),
				MatchMode.ANYWHERE));
		return this;
	}

	public CriteriaParam gt(String propertyName, Object value) {
		conjunction.add(Restrictions.gt(propertyName, value));
		return this;
	}

	public CriteriaParam lt(String propertyName, Object value) {
		conjunction.add(Restrictions.lt(propertyName, value));
		return this;
	}

	public CriteriaParam le(String propertyName, Object value) {
		conjunction.add(Restrictions.le(propertyName, value));
		return this;
	}

	public CriteriaParam ge(String propertyName, Object value) {
		conjunction.add(Restrictions.ge(propertyName, value));
		return this;
	}

	public CriteriaParam between(String propertyName, Object lo, Object hi) {
		conjunction.add(Restrictions.between(propertyName, lo, hi));
		return this;
	}

	public CriteriaParam in(String propertyName, Object... values) {
		conjunction.add(Restrictions.in(propertyName, values));
		return this;
	}

	public CriteriaParam in(String propertyName, Collection values) {
		conjunction.add(Restrictions.in(propertyName, values));
		return this;
	}

	public CriteriaParam isNull(String propertyName) {
		conjunction.add(Restrictions.isNull(propertyName));
		return this;
	}

	public CriteriaParam eqProperty(String propertyName,
			String otherPropertyName) {
		conjunction
				.add(Restrictions.eqProperty(propertyName, otherPropertyName));
		return this;
	}

	public CriteriaParam neProperty(String propertyName,
			String otherPropertyName) {
		conjunction
				.add(Restrictions.neProperty(propertyName, otherPropertyName));
		return this;
	}

	public CriteriaParam ltProperty(String propertyName,
			String otherPropertyName) {
		conjunction
				.add(Restrictions.ltProperty(propertyName, otherPropertyName));
		return this;
	}

	public CriteriaParam leProperty(String propertyName,
			String otherPropertyName) {
		conjunction
				.add(Restrictions.leProperty(propertyName, otherPropertyName));
		return this;
	}

	public CriteriaParam gtProperty(String propertyName,
			String otherPropertyName) {
		conjunction
				.add(Restrictions.gtProperty(propertyName, otherPropertyName));
		return this;
	}

	public CriteriaParam geProperty(String propertyName,
			String otherPropertyName) {
		conjunction
				.add(Restrictions.geProperty(propertyName, otherPropertyName));
		return this;
	}

	public CriteriaParam isNotNull(String propertyName) {
		conjunction.add(Restrictions.isNotNull(propertyName));
		return this;
	}

	public CriteriaParam allEq(Map propertyNameValues) {
		conjunction.add(Restrictions.allEq(propertyNameValues));
		return this;
	}

	public CriteriaParam isEmpty(String propertyName) {
		conjunction.add(Restrictions.isEmpty(propertyName));
		return this;
	}

	public CriteriaParam isNotEmpty(String propertyName) {
		conjunction.add(Restrictions.isNotEmpty(propertyName));
		return this;
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~OR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	public CriteriaParam orIdEq(Object value) {
		disjunction.add(Restrictions.idEq(value));
		return this;
	}

	public CriteriaParam orEq(String propertyName, Object value) {
		disjunction.add(Restrictions.eq(propertyName, value));
		return this;
	}

	public CriteriaParam orEqOrIsNull(String propertyName, Object value) {
		disjunction.add(Restrictions.eqOrIsNull(propertyName,
				value));
		return this;

	}

	public CriteriaParam orNe(String propertyName, Object value) {
		disjunction.add(Restrictions.ne(propertyName, value));
		return this;
	}

	public CriteriaParam orNeOrIsNotNull(String propertyName, Object value) {
		disjunction.add(Restrictions.neOrIsNotNull(propertyName,
				value));
		return this;
	}

	public CriteriaParam orLike(String propertyName, Object value) {
		return orLike(propertyName, value.toString(), MatchMode.ANYWHERE);
	}

	public CriteriaParam orLike(String propertyName, String value,
			MatchMode matchMode) {
		disjunction.add(Restrictions.like(propertyName, value,
				matchMode));
		return this;
	}

	public CriteriaParam orIlike(String propertyName, String value,
			MatchMode matchMode) {
		disjunction.add(Restrictions.ilike(propertyName, value,
				matchMode));
		return this;
	}

	public CriteriaParam orIlike(String propertyName, Object value) {
		disjunction
				.add(Restrictions.ilike(propertyName, value));
		return this;
	}

	public CriteriaParam orGt(String propertyName, Object value) {
		disjunction.add(Restrictions.gt(propertyName, value));
		return this;
	}

	public CriteriaParam orLt(String propertyName, Object value) {
		disjunction.add(Restrictions.lt(propertyName, value));
		return this;
	}

	public CriteriaParam orLe(String propertyName, Object value) {
		disjunction.add(Restrictions.le(propertyName, value));
		return this;
	}

	public CriteriaParam orGe(String propertyName, Object value) {
		disjunction.add(Restrictions.ge(propertyName, value));
		return this;
	}

	public CriteriaParam orBetween(String propertyName, Object lo, Object hi) {
		disjunction.add(Restrictions.between(propertyName, lo,
				hi));
		return this;
	}

	public CriteriaParam orIn(String propertyName, Object[] values) {
		disjunction.add(Restrictions.in(propertyName, values));
		return this;
	}

	public CriteriaParam orIn(String propertyName, Collection values) {
		disjunction.add(Restrictions.in(propertyName, values));
		return this;
	}

	public CriteriaParam orIsNull(String propertyName) {
		disjunction.add(Restrictions.isNull(propertyName));
		return this;
	}

	public CriteriaParam orEqProperty(String propertyName,
			String otherPropertyName) {
		disjunction.add(Restrictions.eqProperty(propertyName,
				otherPropertyName));
		return this;
	}

	public CriteriaParam orNeProperty(String propertyName,
			String otherPropertyName) {
		disjunction.add(Restrictions.neProperty(propertyName,
				otherPropertyName));
		return this;
	}

	public CriteriaParam orLtProperty(String propertyName,
			String otherPropertyName) {
		disjunction.add(Restrictions.ltProperty(propertyName,
				otherPropertyName));
		return this;
	}

	public CriteriaParam orLeProperty(String propertyName,
			String otherPropertyName) {
		disjunction.add(Restrictions.leProperty(propertyName,
				otherPropertyName));
		return this;
	}

	public CriteriaParam orGtProperty(String propertyName,
			String otherPropertyName) {
		disjunction.add(Restrictions.gtProperty(propertyName,
				otherPropertyName));
		return this;
	}

	public CriteriaParam orGeProperty(String propertyName,
			String otherPropertyName) {
		disjunction.add(Restrictions.geProperty(propertyName,
				otherPropertyName));
		return this;
	}

	public CriteriaParam orIsNotNull(String propertyName) {
		disjunction.add(Restrictions.isNotNull(propertyName));
		return this;
	}

	public CriteriaParam orAllEq(Map propertyNameValues) {
		disjunction.add(Restrictions.allEq(propertyNameValues));
		return this;
	}

	public CriteriaParam orIsEmpty(String propertyName) {
		disjunction.add(Restrictions.isEmpty(propertyName));
		return this;
	}

	public CriteriaParam orIsNotEmpty(String propertyName) {
		disjunction.add(Restrictions.isNotEmpty(propertyName));
		return this;
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~Statistics统计~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	public CriteriaParam rowCount() {
		projections.add(Projections.rowCount());
		return this;
	}

	public CriteriaParam count(String propertyName) {
		projections.add(Projections.count(propertyName));
		return this;
	}

	public CriteriaParam max(String propertyName) {
		projections.add(Projections.max(propertyName));
		return this;
	}

	public CriteriaParam min(String propertyName) {
		projections.add(Projections.min(propertyName));
		return this;
	}

	public CriteriaParam sum(String propertyName) {
		projections.add(Projections.sum(propertyName));
		return this;
	}

	public CriteriaParam avg(String propertyName) {
		projections.add(Projections.avg(propertyName));
		return this;
	}

	public CriteriaParam groupProperty(String propertyName) {
		projections.add(Projections.groupProperty(propertyName));
		return this;
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~ORDER排序~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	public CriteriaParam asc(String... propertyNames) {
		for (int i = 0; i < propertyNames.length; i++) {
			orders.add(Order.asc(propertyNames[i]));
		}
		return this;
	}

	public CriteriaParam desc(String... propertyNames) {
		for (int i = 0; i < propertyNames.length; i++) {
			orders.add(Order.desc(propertyNames[i]));
		}
		return this;
	}


	public ProjectionList getProjections() {
		return projections;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setProjections(ProjectionList projections) {
		this.projections = projections;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public CriteriaParam setFirstResult(Integer firstResult) {
		this.firstResult = firstResult;
		return this;
	}

	public CriteriaParam setMaxResults(Integer maxResults) {
		this.maxResults = maxResults;
		return this;
	}

	public static CriteriaParam getInstance() {
		return new CriteriaParam();
	}

	public Disjunction getDisjunction() {
		return disjunction;
	}

	public Conjunction getConjunction() {
		return conjunction;
	}

	public void setDisjunction(Disjunction disjunction) {
		this.disjunction = disjunction;
	}

	public void setConjunction(Conjunction conjunction) {
		this.conjunction = conjunction;
	}
	
	public Criterion getCriterion(){
		int disSize = ((List) disjunction.conditions() ).size();
		int conSize = ((List) conjunction.conditions() ).size();
		if( disSize > 0 && conSize > 0 ){
			return disjunction.add(conjunction);
		}
		if( disSize > 0 ){
			return disjunction;
		}
		return conjunction;
	}
	
}
